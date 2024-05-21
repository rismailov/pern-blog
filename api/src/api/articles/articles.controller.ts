import { Prisma } from '@prisma/client'
import { randomBytes } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import kebabCase from 'lodash.kebabcase'
import { z } from 'zod'
import { faker } from '@faker-js/faker'

import prisma from '../../services/prisma'
import { IArticleOut } from './articles.interfaces'
import {
    createArticleSchemaApi,
    getArticlesSchema,
    showArticleSchema,
} from './articles.schema'
import ArticleService from './articles.service'

export type TGetArticlesResponse = {
    articles: IArticleOut[]
    nextCursor: string
    totalCount: number
}

export async function getAllArticles(
    req: Request<{}, {}, {}, z.infer<typeof getArticlesSchema>>,
    res: Response<TGetArticlesResponse>,
) {
    const perPage = 5

    const [totalCount, articles] = await prisma.$transaction([
        prisma.article.count(),
        prisma.article.findMany({
            omit: {
                updatedAt: true,
                isDraft: true,
            },
            include: {
                category: true,
                user: {
                    omit: {
                        updatedAt: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: perPage,
            ...(req.query.cursor && {
                skip: 1,
                cursor: {
                    id: req.query.cursor,
                },
            }),
            ...(req.query.categories && {
                where: {
                    category: {
                        id: {
                            in: req.query.categories.map((id) => Number(id)),
                        },
                    },
                },
            }),
        }),
    ])

    const articleService = new ArticleService()

    const modifiedArticles = articles.map((article) => {
        const minutesToRead = articleService.getMinutesToRead(article.content)
        const previewImageUrl = articleService.getImageUrl(article.previewImage)
        const createdAt = articleService.getFormattedDate(article.createdAt)

        return {
            ...article,
            minutesToRead,
            previewImageUrl,
            createdAt,
            user: {
                ...article.user,
                avatarUrl: article.user.avatar,
                createdAt: articleService.getFormattedDate(
                    article.user.createdAt,
                ),
            },
        }
    })

    // https://www.prisma.io/docs/orm/prisma-client/queries/pagination#cursor-based-pagination
    const nextCursor = articles[perPage - 1]?.id ?? null

    return res.json({
        articles: modifiedArticles,
        nextCursor,
        totalCount,
    })
}

export async function createArticle(
    req: Request<{}, {}, {}, z.infer<typeof createArticleSchemaApi>>,
    res: Response,
    next: NextFunction,
) {
    if (!req.file) {
        return res.status(400).json({ message: 'Preview image is required' })
    }

    let filename: string | boolean = false

    const articleService = new ArticleService()

    try {
        // upload image to s3
        filename = await articleService.uploadImageToS3(req.file)

        if (!filename) {
            return res.status(500).send({ message: 'Error uploading file' })
        }

        // save the article
        const article = await prisma.article.create({
            data: {
                title: req.query.title,
                content: req.query.content,
                previewText: req.query.previewText,
                previewImage: filename as string,
                slug: `${randomBytes(3).toString('hex')}-${kebabCase(req.query.title)}`,
                category: {
                    connectOrCreate: {
                        where: { label: req.query.category.toLowerCase() },
                        create: { label: req.query.category.toLowerCase() },
                    },
                },
                // TEMP! Replace with auth id
                user: {
                    connect: {
                        id: faker.helpers.rangeToNumber({ min: 1, max: 20 }),
                    },
                },
            },
        })

        return res.status(201).json(article)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // clean-up if validation failed on DB level
            if (typeof filename === 'string') {
                await articleService.deleteImageFromS3(filename)
            }

            if (error.code === 'P2002') {
                return res.status(400).json({
                    message: 'Article with this title already exists',
                })
            }
        }

        next(error)
    }
}

export async function showArticle(
    req: Request<z.infer<typeof showArticleSchema>, {}, {}, {}>,
    res: Response,
) {
    const article = await prisma.article.findUnique({
        where: {
            slug: req.params.slug,
        },
        include: { category: true },
        omit: {
            id: true,
            updatedAt: true,
        },
    })

    if (!article) {
        return res.status(404).json({ message: 'Article not found.' })
    }

    const articleService = new ArticleService()

    const previewImageUrl = articleService.getImageUrl(article.previewImage)
    const minutesToRead = articleService.getMinutesToRead(article.content)
    const createdAt = articleService.getFormattedDate(article.createdAt)

    return res.json({
        ...article,
        previewImageUrl,
        minutesToRead,
        createdAt,
    })
}
