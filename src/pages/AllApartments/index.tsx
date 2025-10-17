import { useDebounce } from '@uidotdev/usehooks'
import { Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { NavigateFunction } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { AllApartmentHeader, AllApartments, AllApartmentSearchBar } from '@/components/pages/AllApartments'
import { DEFAULT_APARTMENT_LIST_DATA, ROUTES } from '@/constants'
import { useRentoraApiApartmentList } from '@/hooks'
import type { ISearchBarProps } from '@/types'

const AllApartmentPage = () => {
  const navigate: NavigateFunction = useNavigate()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_APARTMENT_LIST_DATA.page,
  )
  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      status: '',
    },
  })

  const [search, status]: [string, string] = watch(['search', 'status'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const {
    data: apartments,
    pagination: { totalPages, totalElements },
    metadata: { totalApartments, totalActiveApartments },
    isLoading,
  } = useRentoraApiApartmentList({
    params: {
      page: currentPage,
      size: DEFAULT_APARTMENT_LIST_DATA.size,
      search: debouncedSearch,
      status: debouncedStatus,
    },
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_APARTMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleStatusChange = useCallback(
    (value: string) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_APARTMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const isSearched = useMemo(() => {
    return !!debouncedSearch || !!debouncedStatus
  }, [debouncedSearch, debouncedStatus])

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const handleCreateApartment = useCallback(() => {
    navigate(ROUTES.apartmentCreate.path)
  }, [navigate])

  return (
    <PageSection middle>
      <PageHeader
        title="All Apartments"
        description="A quick overview of the apartments you manage."
        isAction
        actionLabel="Create Apartment"
        actionIcon={<Plus />}
        actionOnClick={handleCreateApartment}
      />
      <AllApartmentHeader
        totalApartments={totalApartments}
        totalActiveApartments={totalActiveApartments}
        isLoading={isLoading}
      />
      <AllApartmentSearchBar onChange={handleSearchChange} onStatusChange={handleStatusChange} />
      <AllApartments
        data={apartments}
        isLoading={isLoading}
        isSearched={isSearched}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
      <p className="text-body-2 text-theme-secondary text-center">
        © 2025 Rentora. Simplifying property management for landlords everywhere.
      </p>
    </PageSection>
  )
}

export default AllApartmentPage
