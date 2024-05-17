'use client'

import { IArticleTagOut } from '@api/articles/articles.interfaces'
import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react'

interface IFilters {
    tags: IArticleTagOut['id'][]
}

interface IBlogContext {
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
}

const BlogContext = createContext<IBlogContext | null>(null)

export const useBlogContext = () => {
    const ctx = useContext(BlogContext)

    if (!ctx) {
        throw new Error(
            'useBlogContext context must be used within BlogContextProvider',
        )
    }

    return ctx
}

export default function BlogContextProvider({ children }: PropsWithChildren) {
    const [filters, setFilters] = useState<IFilters>({
        tags: [],
    })

    return (
        <BlogContext.Provider value={{ filters, setFilters }}>
            {children}
        </BlogContext.Provider>
    )
}
