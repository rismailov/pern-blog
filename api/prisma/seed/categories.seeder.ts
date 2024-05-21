import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export default async function seedCategories(prisma: PrismaClient) {
    const data = faker.helpers.multiple(
        () => ({
            label: faker.word.noun(),
        }),
        { count: 10 },
    )

    try {
        await prisma.category.createManyAndReturn({ data })

        console.log('Categories seeded successfully')
    } catch (error) {
        console.log('Failed to seed categories: ', error)
    }
}
