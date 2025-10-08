import { PackageOpen } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import { TenantTableLoading } from '@/components/pages/Tenant'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { MAINTENANCE_TABLE_HEADER, ROUTES } from '@/constants'
import { MAINTENANCE_STATUS } from '@/enum'
import type { IMaintenance } from '@/types'

import { MaintenanceAction } from '.'

type IMaintenanceTableProps = {
  data: Array<IMaintenance>
  onPageChange: (page: number) => void
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  totalPages: number
  totalElements: number
}

const MaintenanceTable = ({
  data,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}: IMaintenanceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()

  const handleUpdateMaintenance = useCallback(
    (id: string) => {
      if (!apartmentId) return
      navigate(ROUTES.maintenanceUpdate.getPath(apartmentId, id))
    },
    [apartmentId, navigate],
  )

  const statusBadgeVariant = useCallback((maintenanceStatus: string): VariantProps<typeof Badge>['variant'] => {
    switch (maintenanceStatus) {
      case MAINTENANCE_STATUS.PENDING:
        return 'warning'
      case MAINTENANCE_STATUS.ASSIGNED:
        return 'success'
      case MAINTENANCE_STATUS.IN_PROGRESS:
        return 'default'
      default:
        return 'default'
    }
  }, [])

  if (isLoading) {
    return <TenantTableLoading />
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-theme-light flex h-1/2 flex-col items-center justify-center rounded-lg p-5">
        <PackageOpen size={50} />
        <p className="text-theme-secondary text-body-1">No maintenance found</p>
      </div>
    )
  }

  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {MAINTENANCE_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>MAINTENANCE-{index + 1}</TableCell>
              <TableCell>{item.title ? item.title : 'N/A'}</TableCell>
              <TableCell>{item.unitName ? item.unitName : 'N/A'}</TableCell>
              <TableCell>{item.buildingsName ? item.buildingsName : 'N/A'}</TableCell>
              <TableCell>{item.appointmentDate ? item.appointmentDate : 'N/A'}</TableCell>
              <TableCell>{item.dueDate || '-'}</TableCell>
              <TableCell className="capitalize">
                <Badge variant={statusBadgeVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <MaintenanceAction
                  maintenanceId={item.id}
                  onUpdate={handleUpdateMaintenance}
                  onDelete={handleUpdateMaintenance}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <p className="text-theme-secondary text-body-2">
          Showing {data.length} of {totalElements} items
        </p>
        <PaginationBar
          isLoading={isLoading}
          page={currentPage}
          totalElements={totalElements}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default MaintenanceTable
