/**
 * This fetch is abstracted away to avoid prop drilling between components.
 * Important thing to note is that this technique is safe to use because this fetch request
 * won't be duplicated when reused in multiple places; and it's even recommended by TkDodo.
 * https://stackoverflow.com/a/70584958/23618227
 */
import axios from '@/lib/axios'
import { TGetArticlesResponse } from '@api/articles/articles.controller'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useBlogContext } from '../context'

export const useArticles = () => {
    const { filters } = useBlogContext()

    return useInfiniteQuery({
        queryKey: ['articles', filters.tags],
        queryFn: async ({ pageParam }): Promise<TGetArticlesResponse> => {
            // add fake delay on subsequent requests (improves UX imo)
            if (pageParam !== '') {
                await new Promise((r) => setTimeout(r, 250))
            }

            return axios.get('/articles', {
                params: {
                    ...filters,
                    cursor: pageParam,
                },
            })
        },
        placeholderData: keepPreviousData,
        retry: false,
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })
}
