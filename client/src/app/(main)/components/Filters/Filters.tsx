import { Stack, Text } from '@mantine/core'
import { FiltersInner } from './FiltersInner'

export const Filters = () => {
    return (
        <Stack>
            <Text fz="sm" c="dimmed" fw={500}>
                Click on tags to filter blog posts.
            </Text>

            <FiltersInner />
        </Stack>
    )
}
