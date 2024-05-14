'use client'

import { ArticleCard } from '@/components/ArticleCard'
import { FetchErrorMessage } from '@/components/FetchErrorMessage'
import { SectionLoader } from '@/components/SectionLoader'
import axios from '@/lib/axios'
import type { IArticleOut } from '@api/articles/articles.interfaces'
import { SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

export default function BlogPage() {
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
        return <SectionLoader />
    }

    if (isError) {
        return (
            <FetchErrorMessage>
                Something went wrong fetching articles.
            </FetchErrorMessage>
        )
    }

    return (
        <SimpleGrid mt="lg" cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {articles!.map((article) => (
                <ArticleCard key={article.id} {...article} />
            ))}
        </SimpleGrid>
    )
}
