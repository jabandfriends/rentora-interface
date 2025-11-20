import { useDebounce } from '@uidotdev/usehooks'
import { Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card } from '@/components/common'
import { PageTableHeader } from '@/components/ui'
import { ROUTES } from '@/constants'
import { DEFAULT_MAINTENANCE_LIST_DATA } from '@/constants/pagination'
import { MAINTENANCE_STATUS } from '@/enum'
import { useRentoraApiTenantMaintenanceList } from '@/hooks'

import TenantMaintenanceFilter from './TenantMaintenanceFilter'
import TenantMaintenanceSection from './TenantMaintenanceSection'

const TenantMaintenanceList = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()

  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_MAINTENANCE_LIST_DATA.page,
  )
  const { watch, setValue, reset } = useForm({
    defaultValues: {
      status: '' as MAINTENANCE_STATUS,
      sortBy: 'createdAt',
      sortDir: 'desc' as 'asc' | 'desc',
    },
  })

  const [status]: [MAINTENANCE_STATUS] = watch(['status'])

  const debouncedStatus = useDebounce(status ? status : undefined, 300)

  const handleStatusChange = useCallback(
    (value: MAINTENANCE_STATUS) => {
      setValue('status', value)
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

  const handleClearFilters = useCallback(() => {
    reset()
    setCurrentPage(DEFAULT_MAINTENANCE_LIST_DATA.page)
  }, [reset, setCurrentPage])

  const navigateToCreateMaintenance = useCallback(() => {
    if (!apartmentId) return
    navigate(ROUTES.tenantMaintenanceCreate.getPath(apartmentId))
  }, [navigate, apartmentId])

  const {
    data: maintenanceList,
    isLoading: isLoadingMaintenanceList,
    pagination: { totalPages, totalElements },
    error: maintenanceListError,
  } = useRentoraApiTenantMaintenanceList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_MAINTENANCE_LIST_DATA.size,
      status: debouncedStatus,
    },
  })

  const isCreateMaintenanceButtonDisabled: boolean = useMemo(() => {
    return !apartmentId || !!maintenanceListError || isLoadingMaintenanceList
  }, [apartmentId, maintenanceListError, isLoadingMaintenanceList])

  return (
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <PageTableHeader
        title="Maintenance Requests"
        description="Here you can view and keep track of all maintenance requests assigned to you as a tenant."
        actionButton={
          <Button
            onClick={navigateToCreateMaintenance}
            className="flex items-center gap-2"
            disabled={isCreateMaintenanceButtonDisabled}
          >
            <Plus size={18} /> New Maintenance
          </Button>
        }
      />

      <TenantMaintenanceFilter
        isLoadingMaintenanceList={isLoadingMaintenanceList}
        handleStatusChange={handleStatusChange}
        handleClearFilters={handleClearFilters}
      />
      <TenantMaintenanceSection
        isLoading={isLoadingMaintenanceList}
        maintenanceList={maintenanceList}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        totalElements={totalElements}
      />
    </Card>
  )
}

export default TenantMaintenanceList
