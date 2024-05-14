import type { IArticleOut } from '@api/articles/articles.interfaces'
import { Badge, Box, Card, Group, ScrollArea, Text, Title } from '@mantine/core'
import { IconCalendar, IconClock } from '@tabler/icons-react'
import Image from 'next/image'
import { ArrowLink } from '../ArrowLink'
import classes from './ArticleCard.module.css'

export const ArticleCard = (article: IArticleOut) => {
    return (
        <Card p={0} radius="md" className={classes.card}>
            {/* cover image */}
            <Box bg="gray" w="100%" h={200} pos="relative">
                <Image
                    src={article.previewImageUrl}
                    fill
                    alt="Demo article image"
                    objectFit="cover"
                />
            </Box>

            {/* content */}
            <Box p="lg">
                <ScrollArea>
                    <Group wrap="nowrap" gap="0.35rem">
                        {article.tags.map((tag) => (
                            <Badge key={tag.id} variant="light" fw={600}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Group>
                </ScrollArea>

                <Title mt="lg" order={3} lh="1.25">
                    {article.title}
                </Title>

                <Text mt="sm" lineClamp={3}>
                    {article.previewText}
                </Text>

                <Group mt="md" align="center" justify="space-between">
                    {/* time to read */}
                    <Group align="center" gap={8}>
                        <IconClock size={18} className={classes.iconClock} />

                        <Text c="dimmed" fz="sm" fw={500}>
                            {article.minutesToRead}
                        </Text>
                    </Group>

                    {/* written at */}
                    <Group align="center" gap={8}>
                        <IconCalendar size={18} className={classes.iconClock} />

                        <Text c="dimmed" fz="sm" fw={500}>
                            {article.createdAt}
                        </Text>
                    </Group>
                </Group>

                <ArrowLink
                    display="inline-block"
                    mt="md"
                    href={`/blog/${article.slug}`}
                >
                    Read article
                </ArrowLink>
            </Box>
        </Card>
    )
}
