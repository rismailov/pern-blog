'use client'

import { FetchErrorMessage } from '@/components/FetchErrorMessage'
import { Center, Loader, Stack } from '@mantine/core'
import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useArticles } from '../../hooks/use-articles'
import { ArticleCard } from './ArticleCard'

export const Articles = () => {
    const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useArticles()

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, inView, fetchNextPage])

    if (status === 'pending') {
        return (
            <Center mih="6rem" maw={600} w="100%">
                <Loader />
            </Center>
        )
    }

    if (status === 'error') {
        return (
            <FetchErrorMessage>
                Something went wrong fetching articles.
            </FetchErrorMessage>
        )
    }

    if (status === 'success' && !data.pages.length) {
        return <FetchErrorMessage>No articles found.</FetchErrorMessage>
    }

    return (
        <Stack>
            <Stack pos="relative">
                {data.pages.map((group, i) => (
                    <Fragment key={i}>
                        {group.articles.map((article, idx) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                isImagePriority={idx <= 1}
                            />
                        ))}
                    </Fragment>
                ))}
            </Stack>

            <Center ref={ref} mb="5rem">
                {isFetchingNextPage && <Loader />}
            </Center>
        </Stack>
    )
}
