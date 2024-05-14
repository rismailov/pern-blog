import { Center, CenterProps, Loader } from '@mantine/core'

export const SectionLoader = ({ mih }: { mih?: CenterProps['mih'] }) => {
    return (
        <Center {...(mih && { mih })}>
            <Loader />
        </Center>
    )
}
