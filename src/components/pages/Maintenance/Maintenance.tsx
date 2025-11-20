import { useDebounce } from '@uidotdev/usehooks'
import { CircleCheckBig, Clock, ScrollText, Wrench } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { MaintenanceTable } from '@/components/pages/Maintenance'
import { PageTableBody, PageTableHeader, PageTableSearch } from '@/components/ui'
import { DEFAULT_MAINTENANCE_LIST_DATA, ROUTES } from '@/constants'
import { MAINTENANCE_STATUS } from '@/enum'
import { useRentoraApiMaintenanceList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

const Maintenance = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_MAINTENANCE_LIST_DATA.page,
  )
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      status: '',
      sortBy: '',
      sortDir: '',
    },
  })

  const [search, status, sortBy, sortDir]: [string, string, string, string] = watch([
    'search',
    'status',
    'sortBy',
    'sortDir',
  ])

  const handleCreate = useCallback(
    () => navigate(ROUTES.maintenanceCreate.getPath(apartmentId)),
    [navigate, apartmentId],
  )

  const debouncedSearch = useDebounce(search ? search : undefined, 150)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedSortBy = useDebounce(sortBy ? sortBy : undefined, 300)
  const debouncedSortDir = useDebounce(sortDir ? sortDir : undefined, 300)

  const {
    data,
    isLoading,
    pagination: { totalPages, totalElements },
    metadata: { totalMaintenance, pendingCount, inProgressCount, completedCount },
  } = useRentoraApiMaintenanceList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_MAINTENANCE_LIST_DATA.size,
      search: debouncedSearch,
      status: debouncedStatus,
      sortBy: debouncedSortBy,
      sortDir: debouncedSortDir,
    },
  })

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_MAINTENANCE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleStatusChange = useCallback(
    (value: string) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_MAINTENANCE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleSortChange = useCallback(
    (value: string) => {
      setValue('sortBy', value)
      setCurrentPage(DEFAULT_MAINTENANCE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const isSearched: boolean = useMemo(
    () => !!debouncedSearch || !!debouncedStatus || !!debouncedSortBy || !!debouncedSortDir,
    [debouncedSearch, debouncedStatus, debouncedSortBy, debouncedSortDir],
  )

  const maintenanceStats: Array<IStatsCardProps> = useMemo(
    () => [
      {
        title: 'Total Maintenances',
        count: totalMaintenance,
        type: 'primary',
        icon: <ScrollText />,
      },
      {
        title: 'Completed',
        count: completedCount,
        type: 'success',
        icon: <CircleCheckBig />,
      },
      {
        title: 'Pending',
        count: pendingCount,
        type: 'warning',
        icon: <Clock />,
      },
      {
        title: 'In Progress',
        count: inProgressCount,
        type: 'primary',
        icon: <Wrench />,
      },
    ],
    [totalMaintenance, completedCount, pendingCount, inProgressCount],
  )

  return (
    <PageTableBody className="space-y-8">
      <PageTableHeader
        title="Maintenance"
        description="Manage maintenance tasks for this apartment"
        stats={maintenanceStats}
        isLoading={isLoading}
        actionButton={<Button onClick={handleCreate}>New Maintenance</Button>}
      />
      {/* <PageTableSearch /> */}
      <PageTableSearch
        statusEnum={MAINTENANCE_STATUS}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />
      <MaintenanceTable
        data={data}
        isLoading={isLoading}
        isSearched={isSearched}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </PageTableBody>
  )
}

export default Maintenance
