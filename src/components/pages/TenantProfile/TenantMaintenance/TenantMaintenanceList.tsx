import { useDebounce } from '@uidotdev/usehooks'
import { Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { Badge, EmptyPage, PageTableHeader } from '@/components/ui'
import { DEFAULT_MAINTENANCE_LIST_DATA } from '@/constants/pagination'
import { ROUTES } from '@/constants'
import { MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import { useRentoraApiTenantMaintenanceList } from '@/hooks'
import type { IMaintenanceInfo } from '@/types'

import TenantMaintenanceCard from './TenantMaintenanceCard'
import TenantMaintenanceListSkeleton from './TenantMaintenanceListSkeleton'

const TenantMaintenanceList = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const handleCreateMaintenance = useCallback(() => {
    navigate(ROUTES.tenantMaintenanceCreate.getPath(apartmentId ?? ''))
  }, [navigate, apartmentId])

  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_MAINTENANCE_LIST_DATA.page,
  )
  const { watch, setValue } = useForm({
    defaultValues: {
      status: '' as string,
      priority: '' as string,
      isRecurring: '' as string,
      sortBy: 'createdAt',
      sortDir: 'desc' as 'asc' | 'desc',
    },
  })

  const [status, priority, isRecurring, sortBy, sortDir] = watch([
    'status',
    'priority',
    'isRecurring',
    'sortBy',
    'sortDir',
  ])
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedPriority = useDebounce(priority ? priority : undefined, 300)
  const debouncedIsRecurring = useDebounce(isRecurring ? (isRecurring === 'true' ? true : false) : undefined, 300)

  const handleStatusChange = useCallback(
    (value: string) => {
      setValue('status', value === 'all' ? '' : value)
      setCurrentPage(DEFAULT_MAINTENANCE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handlePriorityChange = useCallback(
    (value: string) => {
      setValue('priority', value === 'all' ? '' : value)
      setCurrentPage(DEFAULT_MAINTENANCE_LIST_DATA.page)
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

  const {
    data: maintenanceList,
    isLoading,
    pagination: { totalPages, totalElements },
  } = useRentoraApiTenantMaintenanceList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_MAINTENANCE_LIST_DATA.size,
      status: debouncedStatus,
      priority: debouncedPriority,
      isRecurring: debouncedIsRecurring,
      sortBy,
      sortDir,
    },
  })

  const statusBadgeVariant = useCallback((maintenanceStatus: string): VariantProps<typeof Badge>['variant'] => {
    switch (maintenanceStatus) {
      case MAINTENANCE_STATUS.PENDING:
        return 'warning'
      case MAINTENANCE_STATUS.ASSIGNED:
        return 'success'
      case MAINTENANCE_STATUS.IN_PROGRESS:
        return 'default'
      case MAINTENANCE_STATUS.COMPLETED:
        return 'success'
      case MAINTENANCE_STATUS.CANCELLED:
        return 'error'
      default:
        return 'default'
    }
  }, [])

  const priorityBadgeVariant = useCallback((maintenancePriority: string): VariantProps<typeof Badge>['variant'] => {
    switch (maintenancePriority) {
      case MAINTENANCE_PRIORITY.URGENT:
        return 'error'
      case MAINTENANCE_PRIORITY.HIGH:
        return 'error'
      case MAINTENANCE_PRIORITY.NORMAL:
        return 'warning'
      case MAINTENANCE_PRIORITY.LOW:
        return 'default'
      default:
        return 'default'
    }
  }, [])

  if (isLoading) return <TenantMaintenanceListSkeleton />
  if (!maintenanceList || maintenanceList.length === 0)
    return (
      <EmptyPage title="No maintenance requests found" description="You don't have any maintenance requests yet." />
    )

  return (
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <PageTableHeader
        title="Maintenance Requests"
        description="Here you can view and keep track of all maintenance requests assigned to you as a tenant."
        actionButton={
          <Button className="flex items-center gap-2" onClick={handleCreateMaintenance}>
            <Plus size={18} /> Create Request
          </Button>
        }
      />

      <div className="flex items-center justify-between gap-x-2">
        <Select onValueChange={handleStatusChange} value={status || 'all'}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(MAINTENANCE_STATUS).map(([key, value]) => (
              <SelectItem className="capitalize" key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handlePriorityChange} value={priority || 'all'}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            {Object.entries(MAINTENANCE_PRIORITY).map(([key, value]) => (
              <SelectItem className="capitalize" key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="desktop:grid-cols-2 grid gap-4">
        {maintenanceList.map((maintenance: IMaintenanceInfo) => (
          <TenantMaintenanceCard
            key={maintenance.id}
            maintenance={maintenance}
            statusBadgeVariant={statusBadgeVariant}
            priorityBadgeVariant={priorityBadgeVariant}
          />
        ))}
      </div>
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </Card>
  )
}

export default TenantMaintenanceList
