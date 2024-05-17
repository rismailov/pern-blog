'use client'

import { Anchor, AppShell, Container, Group, Stack, Text } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { Filters } from './components/Filters'
import { Header } from './components/Header'
import BlogContextProvider from './context'
import classes from './layout.module.css'

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <BlogContextProvider>
            <AppShell>
                <Header />

                <AppShell.Main pt="5rem">
                    <Container>
                        <Group
                            wrap="nowrap"
                            align="start"
                            justify="space-between"
                        >
                            <Stack className={classes.stickyContainer}>
                                <Filters />

                                <Stack mt="auto" gap="0.25rem">
                                    <Text fw={500}>
                                        A full stack blog website built with
                                        PERN stack.
                                    </Text>

                                    <Text c="dimmed" fw={500}>
                                        made by{' '}
                                        <Anchor
                                            inherit
                                            href="https://github.com/rismailov"
                                            target="_blank"
                                            c="dark"
                                        >
                                            rismailov
                                        </Anchor>
                                        . source code available on{' '}
                                        <Anchor
                                            inherit
                                            href="https://github.com/rismailov/pern-blog.git"
                                            target="_blank"
                                            c="dark"
                                        >
                                            Github
                                        </Anchor>
                                        .
                                    </Text>
                                </Stack>
                            </Stack>

                            {children}
                        </Group>
                    </Container>
                </AppShell.Main>
            </AppShell>
        </BlogContextProvider>
    )
}
