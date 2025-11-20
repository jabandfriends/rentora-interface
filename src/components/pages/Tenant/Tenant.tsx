//icon
import { useDebounce } from '@uidotdev/usehooks'
import { Building, Plus, UserCheck, Users, UserX } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

//components
import { Button } from '@/components/common'
import { PageTableBody, PageTableHeader, PageTableSearch } from '@/components/ui'
import { DEFAULT_TENANT_LIST_DATA, ROUTES, TENANT_STATUS } from '@/constants'
import { useRentoraApiTenantList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

import TenantTable from './TenantTable'

export const Tenant = () => {
  const navigate: NavigateFunction = useNavigate()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_TENANT_LIST_DATA.page,
  )
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch, setValue } = useForm<{
    search: string
    status: string
    sortBy: 'createdAt' | 'updatedAt'
    sortDir: 'asc' | 'desc'
  }>({
    defaultValues: {
      search: '',
      status: '',
      sortBy: 'createdAt',
      sortDir: 'desc',
    },
  })

  const [search, status]: [string, string] = watch(['search', 'status'])

  const debouncedSearch = useDebounce(search ? search : undefined, 150)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedSortBy = useDebounce(watch('sortBy') ? watch('sortBy') : undefined, 300)
  const debouncedSortDir = useDebounce(watch('sortDir') ? watch('sortDir') : undefined, 300)
  const {
    data: tenants,
    isLoading,
    pagination: { totalPages, totalElements },
    metadata: { totalTenants, totalOccupiedTenants, totalUnoccupiedTenants, totalActiveTenants },
  } = useRentoraApiTenantList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_TENANT_LIST_DATA.size,
      name: debouncedSearch,
      isActive: debouncedStatus,
      sortBy: debouncedSortBy,
      sortDir: debouncedSortDir,
    },
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_TENANT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleStatusChange = useCallback(
    (value: string) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_TENANT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleSortChange = useCallback(
    (value: 'createdAt' | 'updatedAt') => {
      setValue('sortBy', value)
      setCurrentPage(DEFAULT_TENANT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )
  const navigateToCreateTenant = useCallback(() => {
    if (!apartmentId) return
    navigate(ROUTES.tenantCreate.getPath(apartmentId))
  }, [apartmentId, navigate])

  // const handleSortDirChange = useCallback(
  //   (value: 'asc' | 'desc') => {
  //     setValue('sortDir', value)
  //     setCurrentPage(DEFAULT_TENANT_LIST_DATA.page)
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
  const tenantStats: Array<IStatsCardProps> = useMemo(
    () => [
      {
        title: 'Total Tenant',
        count: totalTenants,
        type: 'primary',
        icon: <Users />,
      },
      {
        title: 'Active Tenants',
        count: totalActiveTenants,
        type: 'success',
        icon: <UserCheck />,
      },
      {
        title: 'Occupied Tenants',
        count: totalOccupiedTenants,
        type: 'success',
        icon: <Building />,
      },
      {
        title: 'Unoccupied Tenants',
        count: totalUnoccupiedTenants,
        type: 'error',
        icon: <UserX />,
      },
    ],
    [totalTenants, totalOccupiedTenants, totalUnoccupiedTenants, totalActiveTenants],
  )
  enum TENANT_SORT {
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt',
  }

  return (
    <PageTableBody className="space-y-4">
      <PageTableHeader
        title="Users Management"
        description="Manage and view all users"
        stats={tenantStats}
        isLoading={isLoading}
        actionButton={
          <Button onClick={navigateToCreateTenant} className="flex items-center gap-2">
            <Plus size={18} /> New Tenant
          </Button>
        }
      />
      <PageTableSearch
        placeholder="🚀 Instantly find any tenant by full name or even just first/last name—typos forgiven, lightning fast, almost magical!"
        statusEnum={TENANT_STATUS}
        sortEnum={TENANT_SORT}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />
      <TenantTable
        data={tenants}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </PageTableBody>
  )
}

export default Tenant
