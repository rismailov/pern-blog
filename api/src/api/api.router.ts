import express from 'express'
import MessageResponse from '../types/interfaces/MessageResponse'
import articlesRouter from './articles/articles.router'

const router = express.Router()

router.get<{}, MessageResponse>('/healthcheck', (_, res) => {
    res.sendStatus(200)
})

router.use('/articles', articlesRouter)

export default router
