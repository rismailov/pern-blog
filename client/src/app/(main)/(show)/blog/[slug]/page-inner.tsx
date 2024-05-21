'use client'

import { FetchErrorMessage } from '@/components/FetchErrorMessage'
import axios from '@/lib/axios'
import { IArticleOut } from '@api/articles/articles.interfaces'
import {
    Badge,
    Box,
    Center,
    Group,
    Loader,
    Image as MantineImage,
    Skeleton,
    Text,
    Title,
} from '@mantine/core'
import { IconCalendar, IconClock } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useState } from 'react'

export const ArticlePageInner = ({ slug }: { slug: IArticleOut['slug'] }) => {
    const {
        data: article,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['article', slug],
        queryFn: (): Promise<IArticleOut> => axios.get(`/articles/${slug}`),
        retry: false,
    })

    const [showImageSkeleton, setShowImageSkeleton] = useState(true)

    if (isLoading) {
        return (
            <Center mih="5rem">
                <Loader />
            </Center>
        )
    }

    if (isError) {
        return (
            <FetchErrorMessage>
                {error instanceof AxiosError
                    ? error.response?.data.message
                    : 'Something went wrong fetching article.'}
            </FetchErrorMessage>
        )
    }

    return (
        <>
            <Title fw={700} fz="2.5rem">
                {article!.title}
            </Title>

            <Group mt="md" justify="end" gap="xl">
                {/* time to read */}
                <Group align="center" gap={8}>
                    <IconClock
                        size={18}
                        style={{ stroke: 'var(--mantine-color-dimmed)' }}
                    />

                    <Text c="dimmed">{article!.minutesToRead}</Text>
                </Group>

                {/* written at */}
                <Group align="center" gap={8}>
                    <IconCalendar
                        size={18}
                        style={{ stroke: 'var(--mantine-color-dimmed)' }}
                    />

                    <Text c="dimmed">{article!.createdAt}</Text>
                </Group>
            </Group>

            <Skeleton
                visible={showImageSkeleton}
                component={Box}
                pos="relative"
                h={400}
                style={{ overflow: 'hidden' }}
                mt="lg"
                radius={0}
            >
                <MantineImage
                    component={Image}
                    src={article!.previewImageUrl}
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    alt="Article cover image"
                    onLoad={() => {
                        setShowImageSkeleton(false)
                    }}
                />
            </Skeleton>

            <Group mt="xl" gap="xs">
                {article!.tags.map((tag) => (
                    <Badge key={tag.id} variant="light" fz="0.8rem" size="lg">
                        {tag.label}
                    </Badge>
                ))}
            </Group>

            <Text mt="xl" fz="xl" fw={450}>
                {article!.content}
            </Text>
        </>
    )
}
