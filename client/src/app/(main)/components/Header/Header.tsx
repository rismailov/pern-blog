import {
    AppShell,
    Container,
    Group,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core'
import Link from 'next/link'
import classes from './Header.module.css'

export const Header = () => {
    return (
        <AppShell.Header py="sm">
            <Container h="100%">
                <Group h="100%" justify="space-between" align="center">
                    {/* logo */}
                    <UnstyledButton component={Link} href="/">
                        <Title order={2} className={classes.title}>
                            Wave Blog
                            <Text inherit span c="red">
                                .
                            </Text>
                        </Title>
                    </UnstyledButton>
                </Group>
            </Container>
        </AppShell.Header>
    )
}
