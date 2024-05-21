import express from 'express'

import * as CategoriesController from './categories.controller'

const router = express.Router()

router.get('/', CategoriesController.getAllCategories)

export default router
