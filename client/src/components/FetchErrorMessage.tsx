import { Alert } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { ReactNode } from 'react'

export const FetchErrorMessage = ({ children }: { children?: ReactNode }) => {
    return (
        <Alert
            color="orange"
            title={children ?? 'Error fetching data.'}
            icon={<IconAlertTriangle />}
        />
    )
}
