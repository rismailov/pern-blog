'use client'

import type { IArticleOut } from '@api/articles/articles.interfaces'
import {
    Badge,
    Box,
    Card,
    Group,
    Image as MantineImage,
    ScrollArea,
    Skeleton,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { IconCalendar, IconClock } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { forwardRef, useState } from 'react'
import classes from './ArticleCard.module.css'

type TProps = {
    article: IArticleOut
    // make first 2 articles priority since they'll be rendered above the fold
    isImagePriority: boolean
}

export const ArticleCard = forwardRef<HTMLAnchorElement, TProps>(
    ({ article, isImagePriority }, ref) => {
        const [showImageSkeleton, setShowImageSkeleton] = useState(true)

        return (
            <UnstyledButton
                ref={ref}
                component={Link}
                href={`/blog/${article.slug}`}
                className={classes.wrapper}
                mb="4rem"
            >
                <Card p={0} radius="0" maw={600}>
                    <Skeleton
                        component={Box}
                        pos="relative"
                        h={300}
                        visible={showImageSkeleton}
                        style={{ overflow: 'hidden' }}
                        radius={0}
                    >
                        <MantineImage
                            component={Image}
                            src={article.previewImageUrl}
                            fill
                            priority={isImagePriority}
                            sizes="(max-width: 680px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            alt="Demo article image"
                            onLoad={() => {
                                setShowImageSkeleton(false)
                            }}
                        />
                    </Skeleton>

                    <ScrollArea mt="lg">
                        <Group wrap="nowrap" gap="0.35rem">
                            {article.tags.map((tag) => (
                                <Badge key={tag.id} variant="light" fw={600}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Group>
                    </ScrollArea>

                    <Title
                        mt="md"
                        order={2}
                        lh="1.25"
                        className={classes.title}
                    >
                        {article.title}
                    </Title>

                    <Text mt="sm" lineClamp={3}>
                        {article.previewText}
                    </Text>

                    <Group mt="md" align="center" justify="space-between">
                        {/* time to read */}
                        <Group align="center" gap={8}>
                            <IconClock size={18} className={classes.sprite} />

                            <Text c="dimmed" fw={500}>
                                {article.minutesToRead}
                            </Text>
                        </Group>

                        {/* written at */}
                        <Group align="center" gap={8}>
                            <IconCalendar
                                size={18}
                                className={classes.sprite}
                            />

                            <Text c="dimmed" fw={500}>
                                {article.createdAt}
                            </Text>
                        </Group>
                    </Group>
                </Card>
            </UnstyledButton>
        )
    },
)

ArticleCard.displayName = 'ArticleCard'
