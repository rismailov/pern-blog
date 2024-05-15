import { Container, Group } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { Filters } from './components/Filters/Filters'
import { Hero } from './components/Hero'

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Hero />

            <Container mt="3rem">
                <Group wrap="nowrap" align="start" justify="space-between">
                    <Filters />

                    {children}
                </Group>
            </Container>
        </>
    )
}
