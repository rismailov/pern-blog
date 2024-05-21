import { z } from 'zod'

/**
 * Create article
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const _createArticleSchemaBase = z.object({
    title: z.string().min(2, 'Title should have at least 2 letters'),
    content: z.string().min(200, 'Content should have at least 200 characters'),
    previewText: z
        .string()
        .min(80, 'Preview text should have at least 80 letters'),
    category: z
        .string()
        .min(1, 'Category is required')
        .regex(/^[A-Za-z]+$/i, 'Category can only contain letters')
        .refine((v) => v.toLowerCase()),
    isDraft: z.coerce.boolean(),
})

export const createArticleSchemaApi = _createArticleSchemaBase
export const createArticleSchemaClient = _createArticleSchemaBase.merge(
    z.object({
        previewImage: z.any().refine((v) => !!v, 'Preview image is required'),
    }),
)

export type TArticleClientIn = z.infer<typeof createArticleSchemaClient>

/**
 * Get articles
 */
export const getArticlesSchema = z.object({
    categories: z.array(z.string()).optional(),
    cursor: z.string().optional(),
})

/**
 * Show article
 */

export const showArticleSchema = z.object({
    slug: z.string(),
})
