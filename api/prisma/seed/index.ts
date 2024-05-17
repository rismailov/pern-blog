import { PrismaClient } from '@prisma/client'

import seedArticles from './articles.seeder'
import config from '../../src/services/config'

const prisma = new PrismaClient()

;(async () => {
    try {
        if (config.APP_ENV !== 'development') {
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
