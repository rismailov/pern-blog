import { ICategoryOut } from '../categories/categories.interfaces'
import { IUserOut } from '../users/users.interfaces'

export interface IArticleOut {
    id: string
    slug: string
    title: string
    content: string
    previewText: string
    previewImageUrl: string
    minutesToRead: string
    createdAt: string

    category: ICategoryOut
    user: IUserOut
}
