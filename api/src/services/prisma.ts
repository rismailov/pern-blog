// is this the best approach to create a client singleton?
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
