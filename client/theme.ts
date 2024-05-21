'use client'

import {
    Alert,
    Button,
    Container,
    createTheme,
    Loader,
    Title,
} from '@mantine/core'
import { Golos_Text as FontSans } from 'next/font/google'

const fontSans = FontSans({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
})

export const theme = createTheme({
    defaultRadius: 'md',
    primaryColor: 'dark',
    fontFamily: fontSans.style.fontFamily,
    fontSizes: {
        sm: '0.9rem',
    },
    components: {
        Container: Container.extend({
            defaultProps: {
                size: '1400px',
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

        Loader: Loader.extend({
            defaultProps: {
                size: 'sm',
            },
        }),

        Alert: Alert.extend({
            styles: {
                title: {
                    fontWeight: 600,
                },
            },
        }),
    },
})
