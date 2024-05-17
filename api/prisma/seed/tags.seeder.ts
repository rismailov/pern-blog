import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

function createTag() {
    return {
        label: faker.word.noun(),
    }
}

export default async function seedTags(prisma: PrismaClient) {
    const fakerTags = faker.helpers.multiple(createTag, {
        count: 20,
    })

    try {
        const tags = await prisma.tag.createManyAndReturn({
            data: fakerTags,
        })

        console.log('Tags seeded successfully')

        return tags
    } catch (error) {
        console.log('Failed to seed tags: ', error)

        return []
    }
}
