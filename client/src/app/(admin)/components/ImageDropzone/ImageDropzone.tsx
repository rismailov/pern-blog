import { ActionIcon, Box, Image, Text } from '@mantine/core'
import {
    Dropzone,
    DropzoneProps,
    FileWithPath,
    IMAGE_MIME_TYPE,
} from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import { IconX } from '@tabler/icons-react'
import classes from './ImageDropzone.module.css'

export const ImageDropzone = ({
    value,
    setValue,
    error,
    resetError,
    ...props
}: Partial<DropzoneProps> & {
    value: FileWithPath | null
    setValue: (value: FileWithPath | null) => void
    error?: string
    resetError: () => void
}) => {
    const imageUrl = value ? URL.createObjectURL(value) : null

    function onDrop(files: FileWithPath[]) {
        setValue(files[0])
        resetError()
    }

    return !imageUrl ? (
        <>
            <Dropzone
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                onDrop={onDrop}
                maxSize={5 * 1024 ** 2}
                classNames={{
                    root: classes.dropzoneRoot,
                    inner: classes.dropzoneInner,
                }}
                {...props}
            >
                <Text fz="sm" c="dimmed">
                    Drop image here
                </Text>
            </Dropzone>

            {error && (
                <Text fz="xs" c="red" fw={500} mt={4}>
                    {error}
                </Text>
            )}
        </>
    ) : (
        <Box maw={300} pos="relative">
            <Image
                mt="0.5rem"
                src={imageUrl}
                radius="md"
                onLoad={() => URL.revokeObjectURL(imageUrl)}
                alt="Preview image"
            />

            <ActionIcon
                variant="light"
                color="red"
                className={classes.removeImageButton}
                aria-label="Remove image"
                title="Remove image"
                onClick={() => setValue(null)}
            >
                <IconX size={18} />
            </ActionIcon>
        </Box>
    )
}
