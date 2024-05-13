import { z } from 'zod'

export const createArticleSchema = z.object({
    title: z.string().trim().min(1, 'Title is required'),
    content: z.string().trim().min(1, 'Content is required'),
    previewText: z.string().trim().min(1, 'Preview text is required'),
    tags: z
        .array(z.string())
        .refine((tags) => tags.length > 0, 'Tags are required'),
    isDraft: z.coerce.boolean(),
})

export type TArticleIn = z.infer<typeof createArticleSchema>
