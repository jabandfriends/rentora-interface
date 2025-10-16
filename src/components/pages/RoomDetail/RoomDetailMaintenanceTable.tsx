import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
  FieldEmpty,
  PageTableEmpty,
  PageTableLoading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ROUTES } from '@/constants'
import { MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import type { IMaintenance } from '@/types'
import { formatDate } from '@/utilities'

type IRoomDetailMaintenanceTableProps = {
  maintenance: Array<IMaintenance>
  isLoading: boolean
  totalElements: number
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}
const RoomDetailMaintenanceTable = ({
  maintenance,
  isLoading,
  totalElements,
  currentPage,
  totalPages,
  handlePageChange,
}: IRoomDetailMaintenanceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
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

  const isRecurringBadgeVariant = useCallback((isRecurring: boolean): VariantProps<typeof Badge>['variant'] => {
    switch (isRecurring) {
      case true:
        return 'success'
      case false:
        return 'default'
      default:
        return 'default'
    }
  }, [])

  const isRecurringText = useCallback((isRecurring: boolean) => {
    switch (isRecurring) {
      case true:
        return 'Yes'
      case false:
        return 'No'
      default:
        return 'No'
    }
  }, [])

  const handleNavigateMaintenanceDetail = useCallback(
    (id: string) => {
      navigate(ROUTES.maintenanceDetail.getPath(apartmentId, id))
    },
    [navigate, apartmentId],
  )

  if (isLoading) return <PageTableLoading />

  if (!maintenance || maintenance.length === 0) return <PageTableEmpty message="No maintenance found" />

  return (
    <>
      <Table className="pt-6">
        <TableHeader className="p-4">
          <TableRow>
            <TableHead>Ticket Number</TableHead>
            <TableHead>Service Request Reason</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Buildings</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Recurring</TableHead>
            <TableHead>Recurring Schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenance?.map((maintenance: IMaintenance) => (
            <TableRow
              key={maintenance.id}
              onClick={() => handleNavigateMaintenanceDetail(maintenance.id)}
              className="cursor-pointer"
            >
              <TableCell className="text-theme-primary">{maintenance.ticketNumber}</TableCell>
              <TableCell>{maintenance.title}</TableCell>
              <TableCell>{maintenance.unitName}</TableCell>
              <TableCell>{maintenance.buildingsName}</TableCell>
              <TableCell>
                {maintenance.appointmentDate ? (
                  formatDate(new Date(maintenance.appointmentDate), 'DD/MM/YYYY')
                ) : (
                  <FieldEmpty />
                )}
              </TableCell>
              <TableCell>
                {maintenance.dueDate ? formatDate(new Date(maintenance.dueDate), 'DD/MM/YYYY') : <FieldEmpty />}
              </TableCell>
              <TableCell className="capitalize">
                <Badge variant={priorityBadgeVariant(maintenance.priority)}>{maintenance.priority}</Badge>
              </TableCell>
              <TableCell className="capitalize">
                <Badge variant={statusBadgeVariant(maintenance.status)}>{maintenance.status}</Badge>
              </TableCell>
              <TableCell className="capitalize">
                <Badge variant={isRecurringBadgeVariant(maintenance.isRecurring)}>
                  {isRecurringText(maintenance.isRecurring)}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">{maintenance.recurringSchedule ?? <FieldEmpty />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        totalElements={totalElements}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default RoomDetailMaintenanceTable
