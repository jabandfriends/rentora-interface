import { useDebounce } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { SearchBar } from '@/components/feature'
import { PageHeader } from '@/components/layout'
import { AllApartments } from '@/components/pages/AllApartments'
import { DEFAULT_APARTMENT_LIST_DATA } from '@/constants'
import { useRentoraApiApartmentList } from '@/hooks'
import type { ISearchBarProps } from '@/types'

const AllApartmentPage = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_APARTMENT_LIST_DATA.page,
  )
  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const [search]: [string] = watch(['search'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const { data: apartments, isLoading } = useRentoraApiApartmentList({
    params: {
      page: currentPage,
      size: DEFAULT_APARTMENT_LIST_DATA.size,
      search: debouncedSearch,
    },
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_APARTMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const isSearched = useMemo(() => {
    return !!debouncedSearch
  }, [debouncedSearch])

  return (
    <div className="container mx-auto space-y-4 px-4 py-4">
      <PageHeader title="All Apartments" description="A quick overview of the apartments you manage." />
      <SearchBar onChange={handleSearchChange} />
      <AllApartments data={apartments} isLoading={isLoading} isSearched={isSearched} />
      <p className="text-body-2 text-theme-secondary text-center">
        © 2025 Rentora. Simplifying property management for landlords everywhere.
      </p>
    </div>
  )
}

export default AllApartmentPage
