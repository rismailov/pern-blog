import { Container, Group, SimpleGrid, Title } from '@mantine/core'
import { ArrowLink } from '../../components/ArrowLink'
import { ArticleCard } from '../../components/ArticleCard'
import MOCK_ARTICLES from '../article-data'

export const LatestArticles = () => {
    return (
        <Container py="xl">
            <Group align="end" justify="space-between">
                <Title order={2}>Latest Articles</Title>

                <ArrowLink href="/">More articles</ArrowLink>
            </Group>

            <SimpleGrid mt="lg" cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                {MOCK_ARTICLES.map((article, idx) => (
                    <ArticleCard
                        key={article.title}
                        {...article}
                        imageUrl={`https://picsum.photos/800/400?random=${idx}`}
                    >
                        {article.description}
                    </ArticleCard>
                ))}
            </SimpleGrid>
        </Container>
    )
}
