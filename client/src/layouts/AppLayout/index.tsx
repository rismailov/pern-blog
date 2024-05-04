'use client'

import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PropsWithChildren } from 'react'
import { Header } from './Header'

export default function AppLayout({ children }: PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure()

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { desktop: true, mobile: !opened },
            }}
            padding="md"
        >
            <Header opened={opened} toggle={toggle} />

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}
