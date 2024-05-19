'use client'

import { AppShell } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { Header } from './components/Header'

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <AppShell>
            <Header />

            <AppShell.Main pt="5rem">{children}</AppShell.Main>
        </AppShell>
    )
}
