'use client'

import { Button, Container, createTheme, Title } from '@mantine/core'
import { Golos_Text as FontSans } from 'next/font/google'

const fontSans = FontSans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

export const theme = createTheme({
    fontFamily: fontSans.style.fontFamily,
    defaultRadius: 'md',
    components: {
        Container: Container.extend({
            defaultProps: {
                size: 'xl',
                h: '100%',
            },
        }),

        Title: Title.extend({
            defaultProps: {
                fw: 600,
            },
        }),

        Button: Button.extend({
            defaultProps: {
                fw: 500,
            },

            vars: (theme, props) => {
                if (props.size === 'md') {
                    return {
                        root: {
                            '--button-height': '2.5rem',
                            '--button-fz': '0.975rem',
                            '--button-padding-x': '1.7rem',
                            '--button-radius': 'var(--mantine-radius-xl)',
                        },
                    }
                }

                return { root: {} }
            },
        }),
    },
})
