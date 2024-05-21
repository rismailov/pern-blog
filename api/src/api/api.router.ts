import express from 'express'

import articlesRouter from './articles/articles.router'
import categoriesRouter from './categories/categories.router'

const router = express.Router()

router.get('/healthcheck', (_, res) => {
    res.sendStatus(200)
})

router.use('/articles', articlesRouter)
router.use('/categories', categoriesRouter)

export default router
