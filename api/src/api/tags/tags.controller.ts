import { Request, Response } from 'express'

import prisma from '../../services/prisma'

export async function getAllTags(req: Request, res: Response) {
    const tags = await prisma.tag.findMany()

    return res.json(tags)
}
