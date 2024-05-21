import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

function createUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        avatar: `https://picsum.photos/seed/${faker.string.alpha(5)}/600/600`,
        createdAt: faker.date.between({
            from: new Date('Jan 1, 2024'),
            to: new Date('December 31, 2024'),
        }),
    }
}

export default async function seedUsers(prisma: PrismaClient) {
    const data = faker.helpers.multiple(createUser, {
        count: 20,
    })

    try {
        await prisma.user.createMany({ data })

        console.log('Users seeded successfully')
    } catch (error) {
        console.log('Failed to seed users: ', error)
    }
}
