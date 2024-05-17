import { AppShell, Container, Group, Text, Title } from '@mantine/core'
import classes from './Header.module.css'

export const Header = () => {
    return (
        <AppShell.Header py="sm">
            <Container h="100%">
                <Group h="100%" justify="space-between" align="center">
                    <Title order={2} className={classes.title}>
                        Wave Blog
                        <Text inherit span c="red">
                            .
                        </Text>
                    </Title>
                </Group>
            </Container>
        </AppShell.Header>
    )
}
