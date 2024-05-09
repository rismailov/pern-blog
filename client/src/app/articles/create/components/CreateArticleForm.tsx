'use client'

import { ImageDropzone } from '@/components/ImageDropzone'
import { TextEditor } from '@/components/TextEditor'
import {
    Box,
    Button,
    Group,
    InputWrapper,
    Stack,
    TagsInput,
    Textarea,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'

const schema = z.object({
    title: z
        .string()
        .min(2, { message: 'Title should have at least 2 letters' }),
    content: z
        .string()
        .min(200, { message: 'Content should have at least 200 characters' }),
    previewText: z
        .string()
        .min(80, { message: 'Preview text should have at least 80 letters' }),
    previewImage: z.any().refine((v) => !!v, {
        message: 'Preview image is required',
    }),
    tags: z.array(z.string()).refine((tags) => tags.length > 0, {
        message: 'Please enter at least 1 tag',
    }),
    isDraft: z.boolean(),
})

type TFormValues = z.infer<typeof schema>

export const CreateArticleForm = () => {
    const form = useForm<TFormValues>({
        validate: zodResolver(schema),
        initialValues: {
            title: '',
            content: '',
            previewText: '',
            previewImage: null,
            tags: [],
            isDraft: false,
        },
    })

    async function onSubmit(data: TFormValues) {
        console.log(data)
    }

    return (
        <Box>
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

                    <Button
                        onClick={() => form.setFieldValue('isDraft', true)}
                        variant="light"
                    >
                        Save as draft
                    </Button>
                </Group>
            </form>
        </Box>
    )
}
