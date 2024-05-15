import express from 'express'

import * as TagController from './tags.controller'

const router = express.Router()

router.get('/', TagController.getAllTags)

export default router
