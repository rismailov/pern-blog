import { Badge, Box, Card, Group, ScrollArea, Text, Title } from '@mantine/core'
import { IconCalendar, IconClock } from '@tabler/icons-react'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { ArrowLink } from '../ArrowLink'
import classes from './ArticleCard.module.css'

export const ArticleCard = ({
    title,
    tags,
    date,
    imageUrl,
    children,
}: PropsWithChildren<{
    title: string
    tags: string[]
    date: string
    imageUrl: string
}>) => {
    return (
        <Card p={0} radius="md" className={classes.card}>
            {/* cover image */}
            <Box bg="gray" w="100%" h={200} pos="relative">
                <Image
                    src={imageUrl}
                    fill
                    alt="Demo article image"
                    objectFit="cover"
                />
            </Box>

            {/* content */}
            <Box p="lg">
                <ScrollArea>
                    <Group wrap="nowrap" gap="0.35rem">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="light" fw={600}>
                                {tag}
                            </Badge>
                        ))}
                    </Group>
                </ScrollArea>

                <Title mt="lg" order={3} lh="1.25">
                    {title}
                </Title>

                <Text mt="sm" lineClamp={3}>
                    {children}
                </Text>

                <Group mt="md" align="center" justify="space-between">
                    {/* time to read */}
                    <Group align="center" gap={8}>
                        <IconClock size={18} className={classes.iconClock} />

                        <Text c="dimmed" fz="sm" fw={500}>
                            {`${Math.floor(Math.random() * 6) + 1} minutes read`}
                        </Text>
                    </Group>

                    {/* written at */}
                    <Group align="center" gap={8}>
                        <IconCalendar size={18} className={classes.iconClock} />

                        <Text c="dimmed" fz="sm" fw={500}>
                            {date}
                        </Text>
                    </Group>
                </Group>

                <ArrowLink display="inline-block" mt="md" href="/">
                    Read article
                </ArrowLink>
            </Box>
        </Card>
    )
}
