import { Container, Group, Title } from '@mantine/core'
import { ArrowLink } from '../../../components/ArrowLink'
import { LatestArticlesInner } from './LatestArticlesInner'

export const LatestArticles = () => {
    return (
        <Container py="xl">
            <Group mb="lg" align="end" justify="space-between">
                <Title order={2}>Latest Articles</Title>

                <ArrowLink href="/blog">More articles</ArrowLink>
            </Group>

            <LatestArticlesInner />
        </Container>
    )
}
