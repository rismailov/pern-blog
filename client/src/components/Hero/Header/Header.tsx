import {
    ActionIcon,
    Anchor,
    Box,
    Button,
    Container,
    Group,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { IconMenu2, IconRipple, IconWorld } from '@tabler/icons-react'
import Link from 'next/link'
import classes from './Header.module.css'
import { Search } from './Search'

export const Header = () => {
    return (
        <Box py="sm" className={classes.header}>
            <Container>
                <Group h="100%" justify="space-between" wrap="nowrap">
                    {/* left */}
                    <Group>
                        {/* logo */}
                        <UnstyledButton
                            component={Link}
                            href="/"
                            className={classes.logo}
                        >
                            <Group gap="0.4rem">
                                <Title
                                    order={4}
                                    className={classes.logoText}
                                    visibleFrom="lg"
                                >
                                    Wave
                                </Title>

                                <IconRipple size="1.4rem" />

                                <Title
                                    order={4}
                                    className={classes.logoText}
                                    opacity="0.5"
                                    visibleFrom="lg"
                                >
                                    Blog
                                </Title>
                            </Group>
                        </UnstyledButton>

                        <Group ml="lg" gap="lg" visibleFrom="md">
                            <Anchor className={classes.link}>Sports</Anchor>
                            <Anchor className={classes.link}>Medicine</Anchor>
                            <Anchor className={classes.link}>Technology</Anchor>
                        </Group>
                    </Group>

                    {/* center */}
                    <Search />

                    {/* right */}
                    <Group gap="sm">
                        <UnstyledButton
                            visibleFrom="md"
                            variant="subtle"
                            className={classes.langSwitcherButton}
                        >
                            <Group gap="0.4rem">
                                <IconWorld size="1.25rem" />

                                <Text fz="sm">EN</Text>
                            </Group>
                        </UnstyledButton>

                        <Button
                            visibleFrom="md"
                            variant="light"
                            className={classes.loginButton}
                        >
                            Log In
                        </Button>

                        <Button
                            visibleFrom="md"
                            className={classes.signUpButton}
                        >
                            Sign Up
                        </Button>

                        <ActionIcon
                            variant="light"
                            className={classes.mobileMenuButton}
                            hiddenFrom="md"
                        >
                            <IconMenu2 />
                        </ActionIcon>
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}
