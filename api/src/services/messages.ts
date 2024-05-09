export default {
    validation: {
        required: (attribute: string) => `${attribute} is required.`,
        min: (attribute: string, count: number) =>
            `${attribute} must have at least ${count} characters.`,
    },
}
