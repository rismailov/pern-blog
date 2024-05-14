import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { Prisma } from '@prisma/client'
import prisma from '../../services/prisma'
import ArticleService from './articles.service'
import { createArticleSchemaApi } from './articles.schema'

export function getAllArticles(req: Request, res: Response) {
    return res.json([])
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
        const articleService = new ArticleService(req.file)
        const ok = await articleService.uploadImageToS3()

        if (!ok) {
            return res.status(500).send({ message: 'Error uploading file' })
        }

        // get url of uploaded image
        const previewImageUrl = await articleService.generateImageUrl()

        // save the article along with tags
        const article = await prisma.article.create({
            data: {
                title: data.title,
                content: data.content,
                previewText: data.previewText,
                previewImageUrl,
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
