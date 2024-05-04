import { UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import classes from './Header.module.css'

export const NavLink = ({
    children,
    isActive,
    href,
}: PropsWithChildren<{ isActive: boolean; href: string }>) => {
    return (
        <UnstyledButton
            component={Link}
            href={href}
            data-active={isActive}
            className={classes.navLink}
        >
            {children}
        </UnstyledButton>
    )
}
