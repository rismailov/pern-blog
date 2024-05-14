'use client'

import { ImageDropzone } from '@/components/ImageDropzone'
import { TextEditor } from '@/components/TextEditor'
import axios from '@/lib/axios'
import {
    TArticleClientIn,
    createArticleSchemaClient,
} from '@api/articles/articles.schema'
import {
    Box,
    Button,
    Group,
    InputWrapper,
    LoadingOverlay,
    Stack,
    TagsInput,
    Textarea,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'

export const CreateArticleForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<TArticleClientIn>({
        validate: zodResolver(createArticleSchemaClient),
        initialValues: {
            title: '',
            content: '',
            previewText: '',
            previewImage: null,
            tags: [],
            isDraft: false,
        },
    })

    async function onSubmit(data: TArticleClientIn) {
        if (isLoading) {
            return
        }

        setIsLoading(true)

        try {
            const { previewImage, ...params } = data

            const formData = new FormData()
            formData.append('previewImage', previewImage)

            const resp = await axios.post('/articles', formData, {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            form.reset()

            setIsLoading(false)

            console.log(resp)
        } catch (error) {
            console.error(error)

            setIsLoading(false)
        }
    }

    return (
        <Box pos="relative">
            <LoadingOverlay visible={isLoading} />

            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack>
                    <Textarea
                        withAsterisk
                        label="Title"
                        placeholder="Article title"
                        key={form.key('title')}
                        {...form.getInputProps('title')}
                    />

                    <InputWrapper
                        withAsterisk
                        label="Content"
                        errorProps={{ mt: 6 }}
                        {...form.getInputProps('content')}
                    >
                        <TextEditor
                            value={form.values.content}
                            setValue={(value: string) =>
                                form.setFieldValue('content', value)
                            }
                            hasError={!!form.errors.content}
                        />
                    </InputWrapper>

                    <TagsInput
                        withAsterisk
                        label="Tags"
                        placeholder="Enter tags for this article e.g. 'nature', 'technology'"
                        description="Press enter to confirm the tag."
                        {...form.getInputProps('tags')}
                    />

                    <Textarea
                        withAsterisk
                        label="Preview text"
                        description="Text that is shown in article cards."
                        placeholder="Preview text"
                        key={form.key('previewText')}
                        rows={4}
                        {...form.getInputProps('previewText')}
                    />

                    <InputWrapper
                        withAsterisk
                        label="Preview image"
                        descriptionProps={{ mb: 6 }}
                        errorProps={{ mt: 6 }}
                        description="Image that is shown in article cards."
                    >
                        <ImageDropzone
                            mod={{ error: !!form.errors.previewImage }}
                            value={form.values.previewImage}
                            setValue={(v) => {
                                form.setFieldValue('previewImage', v)
                            }}
                            error={
                                form.errors.previewImage as string | undefined
                            }
                            resetError={() => {
                                form.setFieldError('previewImage', '')
                            }}
                        />
                    </InputWrapper>
                </Stack>

                <Group mt="lg" align="center" gap="sm">
                    <Button type="submit">Publish Article</Button>
                </Group>
            </form>
        </Box>
    )
}
