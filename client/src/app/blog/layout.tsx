import { Container, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'

export default function BlogLayout({ children }: PropsWithChildren) {
    return (
        <Container pt="xl" pb="5rem">
            <Title mb="md">Blog</Title>

            {children}
        </Container>
    )
}
