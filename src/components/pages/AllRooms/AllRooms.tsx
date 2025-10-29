import { useDebounce } from '@uidotdev/usehooks'
import { BedSingle, Blocks, User, Wrench } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import AllRoomsTable from '@/components/pages/AllRooms/AllRoomsTable'
import { PageTableBody, PageTableHeader } from '@/components/ui'
import { DEFAULT_UNIT_LIST_DATA } from '@/constants'
import { UnitStatus } from '@/enum'
import { useRentoraApiUnitList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

import AllRoomSearch from './AllRoomSearch'

const AllRooms = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_UNIT_LIST_DATA.page,
  )

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      status: UnitStatus.available,
      buildingName: '',
    },
  })

  const [search, status, buildingName]: [string, UnitStatus, string] = watch(['search', 'status', 'buildingName'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedBuildingName = useDebounce(buildingName ? buildingName : undefined, 300)

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

      buildingName: debouncedBuildingName,
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
    (value: UnitStatus) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleBuildingChange = useCallback(
    (value: string) => {
      setValue('buildingName', value)
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
    () => !!debouncedSearch || !!debouncedStatus || !!debouncedBuildingName,
    [debouncedSearch, debouncedStatus, debouncedBuildingName],
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
    <PageTableBody className="space-y-8">
      <PageTableHeader
        title="All Rooms"
        description="All rooms with category dashboard"
        stats={All_ROOMS_STAT}
        isLoading={isLoading}
      />
      <AllRoomSearch
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onBuildingChange={handleBuildingChange}
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
    </PageTableBody>
  )
}

export default AllRooms
