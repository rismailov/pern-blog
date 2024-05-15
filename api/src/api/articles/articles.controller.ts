import { Prisma } from '@prisma/client'
import { randomBytes } from 'crypto'
import { format } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import kebabCase from 'lodash.kebabcase'
import { z } from 'zod'

import prisma from '../../services/prisma'
import { createArticleSchemaApi, getArticlesSchema } from './articles.schema'
import ArticleService from './articles.service'

export async function getAllArticles(
    req: Request<{}, {}, {}, z.infer<typeof getArticlesSchema>>,
    res: Response,
) {
    const articles = await prisma.article.findMany({
        omit: {
            updatedAt: true,
            isDraft: true,
        },
        include: {
            tags: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        // display 3 latest articles for homepage
        ...(req.query.preview && {
            take: 3,
        }),
    })

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

    return res.json(modifiedArticles)
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
