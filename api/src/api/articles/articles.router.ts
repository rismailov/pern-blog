import express from 'express'
import multer from 'multer'
import { validate } from '../../services/middlewares'
import * as articleController from './articles.controller'
import { createArticleSchemaApi } from './articles.schema'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', articleController.getAllArticles)

router.post(
    '/',
    validate({ query: createArticleSchemaApi }),
    upload.single('previewImage'),
    // @ts-ignore
    articleController.createArticle,
)

router.get('/:slug', articleController.showArticle)

export default router
