import { SearchIcon } from 'lucide-react'
import { type FormEvent, useCallback } from 'react'

import type { ISearchBarProps } from '@/types'

const SearchBar = (props: ISearchBarProps) => {
  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-theme-light border-theme-secondary-300 flex w-full flex-row items-center justify-center gap-x-4 rounded-lg border px-2 py-1 shadow ring-0"
    >
      <SearchIcon className="size-5" />
      <input
        type="text"
        placeholder="Search"
        className="bg-theme-light text-body-2 flex w-full flex-row gap-x-4 p-2 outline-none ring-0"
        {...props}
      />
    </form>
  )
}

export { SearchBar }
