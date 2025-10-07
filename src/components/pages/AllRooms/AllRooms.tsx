import { useDebounce } from '@uidotdev/usehooks'
import { BedSingle, Blocks, User, Wrench } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import AllRoomsTable from '@/components/pages/AllRooms/AllRoomsTable'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { DEFAULT_UNIT_LIST_DATA, ROOMSTATUSENUM, SORTDIRENUM } from '@/constants'
import { useRentoraApiUnitList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

const AllRooms = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_UNIT_LIST_DATA.page,
  )

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      status: '',
      sort: '',
    },
  })

  const [search, status, sort]: [string, string, string] = watch(['search', 'status', 'sort'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedSort = useDebounce(sort ? sort : undefined, 300)

  const {
    data,
    pagination: { totalPages, totalElements },
    metadata: { totalUnits, totalUnitsAvailable, totalUnitsMaintenance, totalUnitsOccupied },
    isLoading,
  } = useRentoraApiUnitList({
    apartmentId: apartmentId!,
    params: {
      page: currentPage,
      size: DEFAULT_UNIT_LIST_DATA.size,
      search: debouncedSearch,
      status: debouncedStatus,
      sortDir: debouncedSort,
    },
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )
  const handleStatusChange = useCallback(
    (value: string) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleSortChange = useCallback(
    (value: string) => {
      setValue('sort', value)
      setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const isSearched: boolean = useMemo(
    () => !!debouncedSearch || !!debouncedStatus || !!debouncedSort,
    [debouncedSearch, debouncedStatus, debouncedSort],
  )

  const All_ROOMS_STAT: Array<IStatsCardProps> = useMemo(
    () => [
      {
        title: 'Total Rooms',
        count: totalUnits,
        type: 'primary',
        icon: <BedSingle size={20} />,
      },
      {
        title: 'Available Rooms',
        count: totalUnitsAvailable,
        type: 'success',
        icon: <Blocks size={20} />,
      },
      {
        title: 'Occupied Rooms',
        count: totalUnitsOccupied,
        type: 'warning',
        icon: <User size={20} />,
      },
      {
        title: 'Maintenance Rooms',
        count: totalUnitsMaintenance,
        type: 'error',
        icon: <Wrench />,
      },
    ],
    [totalUnits, totalUnitsAvailable, totalUnitsOccupied, totalUnitsMaintenance],
  )

  return (
    <>
      <PageTableHeader title="All Rooms" description="All rooms with category dashboard" stats={All_ROOMS_STAT} />
      <PageTableSearch
        selectedStatus={status}
        selectedSort={sort}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        statusEnum={ROOMSTATUSENUM}
        sortEnum={SORTDIRENUM}
      />
      <AllRoomsTable
        data={data}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        isSearched={isSearched}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
      />
    </>
  )
}

export default AllRooms
