import type { IArticleOut } from '@api/articles/articles.interfaces'
import {
    Badge,
    Card,
    Group,
    Image as MantineImage,
    ScrollArea,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { IconCalendar, IconClock } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ArticleCard.module.css'

export const ArticleCard = (article: IArticleOut) => {
    return (
        <UnstyledButton
            component={Link}
            href={`/blog/${article.slug}`}
            className={classes.wrapper}
        >
            <Card p={0} radius="0" maw={550}>
                <MantineImage
                    src={article.previewImageUrl}
                    width={0}
                    height={0}
                    alt="Demo article image"
                    component={Image}
                    objectFit="cover"
                    h={200}
                    sizes="100vw"
                />

                <ScrollArea mt="lg">
                    <Group wrap="nowrap" gap="0.35rem">
                        {article.tags.map((tag) => (
                            <Badge key={tag.id} variant="light" fw={600}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Group>
                </ScrollArea>

                <Title mt="md" order={2} lh="1.25" className={classes.title}>
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
                        <IconCalendar size={18} className={classes.sprite} />

                        <Text c="dimmed" fw={500}>
                            {article.createdAt}
                        </Text>
                    </Group>
                </Group>
            </Card>
        </UnstyledButton>
    )
}
