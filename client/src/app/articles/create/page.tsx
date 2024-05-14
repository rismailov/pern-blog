import { Container, Stack, Title } from '@mantine/core'
import { CreateArticleForm } from './components/CreateArticleForm'

export default function CreateArticlePage() {
    return (
        <Container pt="xl" pb="5rem" size="sm">
            <Stack>
                <Title order={2}>Create Article</Title>
                <CreateArticleForm />
            </Stack>
        </Container>
    )
}
