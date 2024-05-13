import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import apiRouter from './api/api.router'
import * as middlewares from './services/middlewares'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(
    cors({
        origin: ['http://localhost:3000'],
    }),
)
app.use(express.json())

app.use('/api/v1', apiRouter)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
