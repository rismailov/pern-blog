import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

function createArticle() {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.sentence({ min: 8, max: 12 }),
        slug: faker.lorem.slug({ min: 8, max: 12 }),
        content: faker.lorem.paragraphs(10),
        previewText: faker.lorem.sentences(5),
        previewImage: `https://picsum.photos/seed/${faker.string.alpha(5)}/4000/4000`,
        createdAt: faker.date.between({
            from: new Date('Jan 1, 2024'),
            to: new Date('December 31, 2024'),
        }),
        categoryId: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
        userId: faker.helpers.rangeToNumber({ min: 1, max: 20 }),
    }
}

export default async function seedArticles(prisma: PrismaClient) {
    const data = faker.helpers.multiple(createArticle, {
        count: 50,
    })

    try {
        await prisma.article.createMany({ data })

        console.log('Articles seeded successfully')
    } catch (error) {
        console.log('Failed to seed articles: ', error)
    }
}
