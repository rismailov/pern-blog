// is this the best approach to create a client singleton?
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
    result: {
        user: {
            fullName: {
                needs: { firstName: true, lastName: true },
                compute(user) {
                    return `${user.firstName} ${user.lastName}`
                },
            },
        },
    },
})

export default prisma
