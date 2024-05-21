'use client'

import { Stack, Text, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useArticles } from '../../hooks/use-articles'
import { FiltersInner } from './FiltersInner'

export const Filters = () => {
    const { data } = useArticles()
    const articlesCount = data?.pages[0]?.totalCount ?? 0

    return (
        <Stack w="100%">
            <Text fz="sm">
                ✨ Found {articlesCount}{' '}
                {articlesCount === 1 ? 'article' : 'articles'}.
            </Text>

            <TextInput
                size="lg"
                mb="xs"
                placeholder="Search..."
                leftSection={<IconSearch strokeWidth={1.5} opacity={0.75} />}
            />

            <FiltersInner />
        </Stack>
    )
}
