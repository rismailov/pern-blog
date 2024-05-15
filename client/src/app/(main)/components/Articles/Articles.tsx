'use client'

import { FetchErrorMessage } from '@/components/FetchErrorMessage'
import { SectionLoader } from '@/components/SectionLoader'
import axios from '@/lib/axios'
import type { IArticleOut } from '@api/articles/articles.interfaces'
import { Stack } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { ArticleCard } from './ArticleCard'

export const Articles = () => {
    const {
        data: articles,
        isLoading,
        isError,
    } = useQuery({
        initialData: [],
        queryKey: ['articles'],
        queryFn: (): Promise<IArticleOut[]> => axios.get('/articles'),
        retry: false,
    })

    if (isLoading) {
        return <SectionLoader mih={200} />
    }

    if (isError) {
        return (
            <FetchErrorMessage>
                Something went wrong fetching articles.
            </FetchErrorMessage>
        )
    }

    return (
        <Stack gap="xl">
            {articles!.map((article) => (
                <ArticleCard key={article.id} {...article} />
            ))}
        </Stack>
    )
}
