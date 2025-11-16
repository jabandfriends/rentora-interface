import { useDebounce } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { PageTableHeader } from '@/components/ui'
import { DEFAULT_MAINTENANCE_LIST_DATA } from '@/constants/pagination'
import { MAINTENANCE_STATUS } from '@/enum'
import type { ISearchBarProps } from '@/types'

import TenantMaintenanceCard from './TenantMaintenanceCard'

const TenantMaintenanceList = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_MAINTENANCE_LIST_DATA.page,
  )
  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      status: '' as MAINTENANCE_STATUS,
    },
  })

  const [search, status]: [string, MAINTENANCE_STATUS] = watch(['search', 'status'])
  const debouncedSearch = useDebounce(search ? search : undefined, 150)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
    },
    [setValue],
  )
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

  return (
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <PageTableHeader
        title="Maintenance Requests"
        description="Here you can view and keep track of all maintenance requests assigned to you as a tenant. "
        actionButton={<Button>New Maintenance</Button>}
      />

      <div className="flex items-center justify-between gap-x-2">
        <SearchBar placeholder="Search by name" onChange={handleSearchChange} />
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MAINTENANCE_STATUS).map(([key, value]) => (
              <SelectItem className="capitalize" key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="desktop:grid-cols-2 grid gap-4">
        <TenantMaintenanceCard />
        <TenantMaintenanceCard />
        <TenantMaintenanceCard />
      </div>
    </Card>
  )
}

export default TenantMaintenanceList
