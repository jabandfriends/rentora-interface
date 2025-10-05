import { PackageOpen } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import { MaintenanceAction } from '@/components/pages/Maintenance'
import {
  Badge,
  PageTableLoading,
  PageTableSearchEmpty,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { MAINTENANCE_TABLE_HEADER, ROUTES } from '@/constants'
import type { IMaintenance } from '@/types'

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
  onPageChange,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
}: IMaintenanceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const handleUpdateMaintenance = useCallback(
    (maintenanceId: string) => {
      if (!apartmentId) return
      navigate(ROUTES.maintenanceUpdate.getPath(apartmentId, maintenanceId))
    },
    [apartmentId, navigate],
  )
  // const handleDeleteMaintenance = useCallback(
  //   (maintenanceId: string) => {
  //     if (!apartmentId) return
  //     navigate(ROUTES.maintenanceDelete.getPath(apartmentId, maintenanceId))
  //   },
  //   [apartmentId, navigate],
  // )

  const handleRowClick = useCallback(
    (id: string) => {
      navigate(ROUTES.maintenanceDetail.getPath(apartmentId, id))
    },
    [navigate, apartmentId],
  )
  const statusBadgeVariant = useCallback((maintenanceStatus: string): VariantProps<typeof Badge>['variant'] => {
    switch (maintenanceStatus) {
      case 'pending':
        return 'success'
      case 'assigned':
        return 'default'
      case 'in_progress':
        return 'warning'
      default:
        return 'default'
    }
  }, [])

  if (isLoading) {
    return <PageTableLoading />
  }
  if (isSearched && data.length === 0) {
    return <PageTableSearchEmpty message="No maintenance found" subMessage="No maintenance for this search" />
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
          {data.map((item) => (
            <TableRow className="cursor-pointer" onClick={() => handleRowClick(item.id)} key={item.id}>
              <TableCell>{item.unitName}</TableCell>
              <TableCell>{item.buildingsName}</TableCell>
              <TableCell>{item.requestedDate} </TableCell>
              <TableCell>{item.appointmentDate}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Badge variant={statusBadgeVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <MaintenanceAction
                  maintenanceId={item.id}
                  onUpdate={handleUpdateMaintenance}
                // onDelete={handleDeleteMaintenance}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        onPageChange={onPageChange}
        isLoading={isLoading}
        page={currentPage}
        totalElements={totalElements}
        totalPages={totalPages}
      />
    </div>
  )
}

export default MaintenanceTable
