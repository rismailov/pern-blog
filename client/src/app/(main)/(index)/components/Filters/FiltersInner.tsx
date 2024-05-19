'use client'

import { FetchErrorMessage } from '@/components/FetchErrorMessage'
import axios from '@/lib/axios'
import { IArticleTagOut } from '@api/articles/articles.interfaces'
import { Badge, Group, Loader, UnstyledButton } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useBlogContext } from '../../context'

export const FiltersInner = () => {
    const { filters, setFilters } = useBlogContext()

    const {
        data: tags,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['tags'],
        queryFn: (): Promise<IArticleTagOut[]> => axios.get('/tags'),
        retry: false,
    })

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return (
            <FetchErrorMessage>
                Something went wrong fetching tags.
            </FetchErrorMessage>
        )
    }

    if (tags && !tags.length) {
        return <FetchErrorMessage>No tags found.</FetchErrorMessage>
    }

    return (
        <Group maw={500} wrap="wrap" gap="0.5rem">
            {tags!.map((tag) => (
                <UnstyledButton
                    key={tag.id}
                    onClick={() => {
                        filters.tags.includes(tag.id)
                            ? setFilters((prev) => ({
                                  ...prev,
                                  tags: prev.tags.filter((t) => t !== tag.id),
                              }))
                            : setFilters((prev) => ({
                                  ...prev,
                                  tags: [...prev.tags, tag.id],
                              }))
                    }}
                >
                    <Badge
                        variant={
                            filters.tags.includes(tag.id) ? 'filled' : 'light'
                        }
                        fz="0.8rem"
                        size="lg"
                    >
                        {tag.label}
                    </Badge>
                </UnstyledButton>
            ))}
        </Group>
    )
}
