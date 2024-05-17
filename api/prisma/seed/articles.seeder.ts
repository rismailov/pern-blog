import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import seedTags from './tags.seeder'

function createArticle() {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.sentence({ min: 8, max: 12 }),
        slug: faker.lorem.slug({ min: 8, max: 12 }),
        content: faker.lorem.paragraphs(10),
        previewText: faker.lorem.sentences(5),
        previewImage: `https://picsum.photos/seed/${faker.string.alpha(5)}/600/400`,
        createdAt: faker.date.between({
            from: new Date('Jan 1, 2024'),
            to: new Date('December 31, 2024'),
        }),
    }
}

export default async function seedArticles(prisma: PrismaClient) {
    const fakerArticles = faker.helpers.multiple(createArticle, {
        count: 50,
    })

    const tags = await seedTags(prisma)

    try {
        fakerArticles.forEach(async (article) => {
            const shuffledTags = faker.helpers.shuffle(tags)
            const randomRange = faker.helpers.rangeToNumber({
                min: 1,
                max: 5,
            })

            const tagIds = shuffledTags
                .slice(0, randomRange)
                .map((t) => ({ id: t.id }))

            await prisma.article.create({
                data: {
                    ...article,
                    tags: {
                        connect: tagIds,
                    },
                },
            })
        })

        console.log('Articles seeded successfully')
    } catch (error) {
        console.log('Failed to seed articles: ', error)
    }
}
