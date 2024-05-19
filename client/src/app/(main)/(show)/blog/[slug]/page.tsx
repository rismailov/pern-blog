import { Container } from '@mantine/core'
import React from 'react'
import { ArticlePageInner } from './page-inner'

export default function ArticlePage({
    params: { slug },
}: {
    params: { slug: string }
}) {
    return (
        <Container size="md" pb="5rem">
            <ArticlePageInner slug={slug} />
        </Container>
    )
}
