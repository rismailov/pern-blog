import { Anchor, Container, Group, Stack, Text, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'

const TechAnchor = ({
    href,
    children,
}: PropsWithChildren<{ href: string }>) => {
    return (
        <Anchor display="inline" href={href} target="_blank" inherit>
            {children}
        </Anchor>
    )
}

export const Hero = () => {
    return (
        <Container>
            <Group justify="space-between" align="center" pt="xl">
                <Title
                    fz={70}
                    fw={700}
                    style={{ letterSpacing: '-0.025em' }}
                    lh={1}
                >
                    Wave Blog
                    <Text inherit span c="red">
                        .
                    </Text>
                </Title>

                <Stack gap="0.4rem" justify="space-between" h="100%">
                    <Text fw={500}>
                        A full stack blog website built with PERN stack (
                        <TechAnchor href="https://www.postgresql.org/">
                            PostgreSQL
                        </TechAnchor>
                        ,{' '}
                        <TechAnchor href="https://expressjs.com/">
                            Express.js
                        </TechAnchor>
                        ,{' '}
                        <TechAnchor href="https://react.dev/">
                            React.js
                        </TechAnchor>
                        ,{' '}
                        <TechAnchor href="https://nodejs.org/en">
                            Node.js
                        </TechAnchor>
                        ).
                    </Text>

                    <Text c="dimmed" fw={500} ta="right">
                        built by{' '}
                        <Anchor
                            inherit
                            href="https://github.com/rismailov"
                            target="_blank"
                            c="dark"
                        >
                            rismailov
                        </Anchor>{' '}
                        | source code available on{' '}
                        <Anchor
                            inherit
                            href="https://github.com/rismailov/pern-blog.git"
                            target="_blank"
                            c="dark"
                        >
                            Github
                        </Anchor>
                    </Text>
                </Stack>
            </Group>
        </Container>
    )
}
