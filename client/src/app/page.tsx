import { Divider } from '@mantine/core'
import { Hero } from './components/Hero'
import { LatestArticles } from './components/LatestArticles'

export default function HomePage() {
    return (
        <>
            <Hero />

            <Divider mt="lg" />

            <LatestArticles />
        </>
    )
}
