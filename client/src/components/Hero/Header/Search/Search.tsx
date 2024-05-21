import { Center, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import classes from './Search.module.css'

export const Search = () => {
    return (
        <TextInput
            placeholder="Search for articles..."
            classNames={{
                root: classes.searchRoot,
                input: classes.searchInput,
            }}
            rightSection={
                <Center pr="0.25rem">
                    <IconSearch className={classes.searchInputIcon} />
                </Center>
            }
        />
    )
}
