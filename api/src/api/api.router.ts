import express from 'express'

import articlesRouter from './articles/articles.router'
import tagsRouter from './tags/tags.router'

const router = express.Router()

router.get('/healthcheck', (_, res) => {
    res.sendStatus(200)
})

router.use('/articles', articlesRouter)
router.use('/tags', tagsRouter)

export default router
