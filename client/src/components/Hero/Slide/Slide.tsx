import { Carousel } from '@mantine/carousel'
import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Group,
    Image,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import NextImage from 'next/image'
import classes from './Slide.module.css'

export const Slide = () => {
    return (
        <Carousel.Slide className={classes.root}>
            <Image
                component={NextImage}
                src="/demo.jpg"
                fill
                sizes="100vw"
                alt="demo"
                priority
            />

            <Box className={classes.content}>
                <Container pb="4rem">
                    <Box className={classes.inner}>
                        <Stack gap="0">
                            <Badge
                                size="lg"
                                className={classes.articleCategory}
                            >
                                Destination
                            </Badge>

                            <Title className={classes.articleTitle}>
                                Exploring the Wonders of Hiking
                            </Title>

                            <Text className={classes.articleDescription}>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Tempore, totam. Lorem ipsum
                                dolor sit amet consectetur, adipisicing elit.
                                Tempore, totam.
                            </Text>

                            <Button className={classes.articleButton}>
                                Read the article
                            </Button>
                        </Stack>

                        <Stack className={classes.author} align="end" gap="xs">
                            <Group gap="xs">
                                <Avatar
                                    size="sm"
                                    variant="white"
                                    classNames={{
                                        placeholder: classes.avatarPlaceholder,
                                    }}
                                >
                                    TR
                                </Avatar>

                                <Text c="white">Theodore Reginald</Text>
                            </Group>

                            <Text c="gray.5" fz="sm">
                                <Text span inherit>
                                    24 Jan 2024
                                </Text>

                                <Text
                                    span
                                    inherit
                                    display="inline-block"
                                    mx="0.6rem"
                                >
                                    •
                                </Text>

                                <Text span inherit>
                                    8 mins read
                                </Text>
                            </Text>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Carousel.Slide>
    )
}
