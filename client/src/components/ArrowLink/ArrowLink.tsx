import { Anchor, AnchorProps, Group } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import classes from './ArrowLink.module.css'

type TProps = AnchorProps & {
    href: string
    children: ReactNode
}

/**
 * Anchor with arrow.
 */
export const ArrowLink = ({ href, children, ...props }: TProps) => {
    return (
        <Anchor
            fw={500}
            component={Link}
            href={href}
            className={classes.link}
            {...props}
        >
            <Group align="center" gap={6}>
                <span>{children}</span>

                <IconArrowRight size={18} />
            </Group>
        </Anchor>
    )
}
