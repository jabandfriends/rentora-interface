import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
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
import { MAINTENANCE_TABLE_HEADER, ROUTES } from '@/constants'
import { MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import { useRentoraApiDeleteMaintenance } from '@/hooks/api/execute/useRentoraApiDeleteMaintenance'
import type { IMaintenance, Maybe } from '@/types'
import { formatDate, getErrorMessage } from '@/utilities'

import { MaintenanceAction } from '.'
import MaintenanceDeleteAlert from './MaintenanceDeleteAlert'

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

  //delete maintenance api
  const { mutateAsync: deleteMaintenance } = useRentoraApiDeleteMaintenance()

  const [isAlertOpen, setIsAlertOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [pendingDeleteId, setPendingDeleteId]: [Maybe<string>, Dispatch<SetStateAction<Maybe<string>>>] =
    useState<Maybe<string>>(null)

  const handleRowClick = useCallback(
    (id: string) => {
      navigate(ROUTES.maintenanceDetail.getPath(apartmentId, id))
    },
    [navigate, apartmentId],
  )

  const handleRequestDelete = useCallback((id: string) => {
    setPendingDeleteId(id)
    setIsAlertOpen(true)
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (!apartmentId || !pendingDeleteId) return toast.error('Something went wrong')

    try {
      await deleteMaintenance({ apartmentId, maintenanceId: pendingDeleteId })
      toast.success('Maintenance deleted successfully')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [apartmentId, pendingDeleteId, deleteMaintenance])

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

  if (isLoading) {
    return <PageTableLoading />
  }

  if (!data || data.length === 0) {
    return <PageTableEmpty message="No maintenances found" />
  }

  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <MaintenanceDeleteAlert
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        handleConfirmDelete={handleConfirmDelete}
      />
      <Table>
        <TableHeader>
          <TableRow>
            {MAINTENANCE_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: IMaintenance) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => handleRowClick(item.id)}
              key={item.id + item.ticketNumber}
            >
              <TableCell>{item.ticketNumber}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.unitName}</TableCell>
              <TableCell>{item.buildingsName}</TableCell>
              <TableCell>
                {item.appointmentDate ? formatDate(new Date(item.appointmentDate), 'DD/MM/YYYY') : <FieldEmpty />}
              </TableCell>
              <TableCell>{item.dueDate ? formatDate(new Date(item.dueDate), 'DD/MM/YYYY') : <FieldEmpty />}</TableCell>
              <TableCell className="capitalize">
                <Badge variant={priorityBadgeVariant(item.priority)}>{item.priority}</Badge>
              </TableCell>
              <TableCell className="capitalize">
                <Badge variant={statusBadgeVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <MaintenanceAction
                  maintenanceId={item.id}
                  onUpdate={handleUpdateMaintenance}
                  onDelete={() => handleRequestDelete(item.id)}
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
