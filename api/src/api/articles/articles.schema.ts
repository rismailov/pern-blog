import { z } from 'zod'

/**
 * Create article
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const _createArticleSchemaBase = z.object({
    title: z
        .string()
        .min(2, { message: 'Title should have at least 2 letters' }),
    content: z
        .string()
        .min(200, { message: 'Content should have at least 200 characters' }),
    previewText: z
        .string()
        .min(80, { message: 'Preview text should have at least 80 letters' }),
    tags: z.array(z.string()).refine((tags) => tags.length > 0, {
        message: 'Please enter at least 1 tag',
    }),
    isDraft: z.coerce.boolean(),
})

export const createArticleSchemaApi = _createArticleSchemaBase
export const createArticleSchemaClient = _createArticleSchemaBase.merge(
    z.object({
        previewImage: z.any().refine((v) => !!v, {
            message: 'Preview image is required',
        }),
    }),
)

export type TArticleClientIn = z.infer<typeof createArticleSchemaClient>

/**
 * Get articles
 */
export const getArticlesSchema = z.object({
    tags: z.array(z.string()).optional(),
    cursor: z.string().optional(),
})

/**
 * Show article
 */

export const showArticleSchema = z.object({
    slug: z.string(),
})
