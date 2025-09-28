import { useDebounce } from '@uidotdev/usehooks'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import AllRoomsTable from '@/components/pages/AllRooms/AllRoomsTable'
import { PageTableHeader } from '@/components/ui'
import { DEFAULT_UNIT_LIST_DATA } from '@/constants'
import { useRentoraApiUnitList } from '@/hooks'
import type { IStatsCardProps } from '@/types'

const AllRooms = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_UNIT_LIST_DATA.page,
  )

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const [search]: [string] = watch(['search'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
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
    },
  })

  // const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
  //   ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
  //     setValue('search', value)
  //     setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
  //   },
  //   [setValue, setCurrentPage],
  // )

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const All_ROOMS_STAT: Array<IStatsCardProps> = [
    {
      title: 'Total Rooms',
      count: totalUnits,
      type: 'primary',
    },
    {
      title: 'Available Rooms',
      count: totalUnitsAvailable,
      type: 'success',
    },
    {
      title: 'Occupied Rooms',
      count: totalUnitsOccupied,
      type: 'warning',
    },
    {
      title: 'Maintenance Rooms',
      count: totalUnitsMaintenance,
      type: 'error',
    },
  ]

  return (
    <>
      <PageTableHeader title="All Rooms" description="All rooms with category dashboard" stats={All_ROOMS_STAT} />
      {/* <PageTableSearch
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      /> */}
      <AllRoomsTable
        data={data}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
      />
    </>
  )
}

export default AllRooms
