import { Request, Response } from 'express'

import prisma from '../../services/prisma'

export async function getAllCategories(req: Request, res: Response) {
    const categories = await prisma.category.findMany()

    return res.json(categories)
}
