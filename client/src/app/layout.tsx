import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { theme } from '../../theme'
import AppLayout from '../layouts/AppLayout'

export const metadata = {
    title: 'Homepage | PERN Blog',
    description:
        'A blog website built with PERN stack (Postgres, ExpressJS, ReactJS, NodeJS)',
}

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />

                <link rel="shortcut icon" href="/favicon.svg" />

                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>

            <body>
                <MantineProvider theme={theme}>
                    <AppLayout>{children}</AppLayout>
                </MantineProvider>
            </body>
        </html>
    )
}
