interface IArticleTag {
    id: number
    label: string
}

export interface IArticleOut {
    id: string
    slug: string
    title: string
    content: string
    previewText: string
    previewImageUrl: string
    minutesToRead: string
    createdAt: string

    tags: IArticleTag[]
}
