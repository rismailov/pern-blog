'use client'

import { PropsWithChildren } from 'react'
import { Hero } from '@/components/Hero'

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Hero />

            {children}

            {/* <AppShell.Main pt="5rem">{children}</AppShell.Main> */}
        </>
    )
}
