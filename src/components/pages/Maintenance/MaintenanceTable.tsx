import { PackageOpen } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { MaintenanceAction, MaintenanceTableLoading } from '@/components/pages/Maintenance'
import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { MAINTENANCE_TABLE_HEADER, ROUTES } from '@/constants'
import type { IMaintenance, IPaginate } from '@/types'

type IMaintenanceTableProps = {
  data: Array<IMaintenance>
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

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

  if (isLoading) {
    return <MaintenanceTableLoading />
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
            <TableRow className="cursor-pointer" onClick={() => handleRowClick(index.toString())} key={index}>
              <TableCell>{item.unitName}</TableCell>
              <TableCell>{item.buildingsName}</TableCell>
              <TableCell>{item.requestedDate} </TableCell>
              <TableCell>{item.appointmentDate}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Badge>{item.status}</Badge>
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
        isLoading={isLoading}
        page={currentPage}
        totalElements={totalElements}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default MaintenanceTable
