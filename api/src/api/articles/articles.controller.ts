import { Prisma } from '@prisma/client'
import { randomBytes } from 'crypto'
import { format } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import kebabCase from 'lodash.kebabcase'
import { z } from 'zod'

import prisma from '../../services/prisma'
import { IArticleOut } from './articles.interfaces'
import { createArticleSchemaApi, getArticlesSchema } from './articles.schema'
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
            include: { tags: true },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: perPage,
            ...(req.query.cursor && {
                skip: 1,
                cursor: {
                    id: req.query.cursor,
                },
            }),
            ...(req.query.tags && {
                where: {
                    tags: {
                        some: {
                            id: {
                                in: req.query.tags.map((id) => Number(id)),
                            },
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

        return {
            ...article,
            createdAt: format(article.createdAt, 'MMM d, yyyy'),
            minutesToRead,
            previewImageUrl,
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
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ message: 'Preview image is required' })
        }

        const { tags, ...data } = req.query

        // upload image to s3
        const uploadFileService = new ArticleService()
        const filename = await uploadFileService.uploadImageToS3(req.file)

        if (!filename) {
            return res.status(500).send({ message: 'Error uploading file' })
        }

        // save the article along with tags
        const article = await prisma.article.create({
            data: {
                title: data.title,
                content: data.content,
                previewText: data.previewText,
                previewImage: filename as string,
                slug: `${randomBytes(3).toString('hex')}-${kebabCase(data.title)}`,
                tags: {
                    connectOrCreate: tags.map((tag) => {
                        return {
                            where: { label: tag },
                            create: { label: tag },
                        }
                    }),
                },
            },
        })

        return res.status(201).json(article)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    message: 'Article with this title already exists',
                })
            }
        }

        next(error)
    }
}
