import {
    Anchor,
    AppShell,
    Burger,
    Container,
    Group,
    Text,
    UnstyledButton,
} from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classes from './Header.module.css'
import { NavLink } from './NavLink'

export const Header = ({
    opened,
    toggle,
}: {
    opened: boolean
    toggle: () => void
}) => {
    const pathname = usePathname()

    return (
        <>
            <AppShell.Header>
                <Container>
                    <Group h="100%" align="center" justify="space-between">
                        {/* left side */}
                        <Group style={{ flex: 1 }}>
                            <UnstyledButton
                                component={Link}
                                href="/"
                                className={classes.logoLink}
                            >
                                <Text fw={500}>PERN Blog</Text>
                            </UnstyledButton>

                            <Group ml="xl" gap="1.6rem" visibleFrom="sm">
                                <NavLink href="/" isActive={pathname === '/'}>
                                    Home
                                </NavLink>

                                <NavLink
                                    href="/blog"
                                    isActive={pathname.startsWith('/blog')}
                                >
                                    Blog
                                </NavLink>

                                <NavLink
                                    href="/contact"
                                    isActive={pathname === '/contact'}
                                >
                                    Contact
                                </NavLink>
                            </Group>
                        </Group>

                        {/* right side */}
                        <Group>
                            <Burger
                                opened={opened}
                                onClick={toggle}
                                hiddenFrom="sm"
                                size="sm"
                            />

                            <Anchor
                                component={Link}
                                href="/articles/create"
                                fw={500}
                            >
                                Create Article
                            </Anchor>
                        </Group>
                    </Group>
                </Container>
            </AppShell.Header>

            {/* mobile menu */}
            <AppShell.Navbar py="md" px={4}>
                <NavLink href="/" isActive={pathname === '/'}>
                    Home
                </NavLink>

                <NavLink href="/blog" isActive={pathname.startsWith('/blog')}>
                    Blog
                </NavLink>

                <NavLink href="/contact" isActive={pathname === '/contact'}>
                    Contact
                </NavLink>
            </AppShell.Navbar>
        </>
    )
}
