'use client'

import { FetchErrorMessage } from '@/components/FetchErrorMessage'
import { SectionLoader } from '@/components/SectionLoader'
import axios from '@/lib/axios'
import { IArticleOut } from '@api/articles/articles.interfaces'
import { SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { ArticleCard } from '../../../components/ArticleCard'

export const LatestArticlesInner = () => {
    const {
        data: articles,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['latest-articles'],
        queryFn: (): Promise<IArticleOut[]> =>
            axios.get('/articles', {
                params: {
                    preview: true,
                },
            }),
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

    if (!!articles && !articles.length) {
        return (
            <FetchErrorMessage>No articles found to display.</FetchErrorMessage>
        )
    }

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {articles!.map((article, idx) => (
                <ArticleCard key={article.title} {...article} />
            ))}
        </SimpleGrid>
    )
}
