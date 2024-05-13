import { Button, Center, Container, Stack, Text, Title } from '@mantine/core'

export const Hero = () => {
    return (
        <Container py="xl">
            <Center>
                <Stack align="center" gap={0}>
                    <Title order={1} fz={40}>
                        PERN Blog
                    </Title>

                    <Text mt="xs" fz="lg" ta="center" maw={700} opacity={0.65}>
                        A blog website built with PERN stack (Postgres,
                        ExpressJS, ReactJS, NodeJS).
                    </Text>

                    <Button
                        size="md"
                        mt="lg"
                        component="a"
                        href="https://github.com/rismailov/pern-blog.git"
                        target="_blank"
                    >
                        Source Code
                    </Button>
                </Stack>
            </Center>
        </Container>
    )
}
