import { PrismaClient } from '@prisma/client'
import seedArticles from './articles.seeder'

const prisma = new PrismaClient()

;(async () => {
    try {
        if (process.env.NODE_ENV !== 'development') {
            throw new Error("Can't seed data in production mode")
        }

        await seedArticles(prisma)
    } catch (error) {
        console.error('Encountered error while seeding database: ', error)

        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
})()
