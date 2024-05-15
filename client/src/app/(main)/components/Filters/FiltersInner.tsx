'use client'

import { FetchErrorMessage } from '@/components/FetchErrorMessage'
import axios from '@/lib/axios'
import { IArticleTagOut } from '@api/articles/articles.interfaces'
import { Badge, Group, Loader, UnstyledButton } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const FiltersInner = () => {
    const [filteredTags, setFilteredTags] = useState<IArticleTagOut['id'][]>([])

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
        <Group wrap="wrap" gap="0.5rem">
            {tags!.map((tag) => (
                <UnstyledButton
                    key={tag.id}
                    onClick={() => {
                        filteredTags.includes(tag.id)
                            ? setFilteredTags((prev) =>
                                  prev.filter((t) => t !== tag.id),
                              )
                            : setFilteredTags((prev) => [...prev, tag.id])
                    }}
                >
                    <Badge
                        variant={
                            filteredTags.includes(tag.id) ? 'filled' : 'light'
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
