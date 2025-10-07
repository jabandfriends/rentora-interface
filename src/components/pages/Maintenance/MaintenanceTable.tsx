import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { MAINTENANCE_TABLE_HEADER, ROUTES } from '@/constants'

import MaintenanceAction from './MaintenanceAction'

type IMaintenanceTableProps = {
  data: Array<any>
}

const MaintenanceTable = ({ data }: IMaintenanceTableProps) => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const handleUpdateTenant = useCallback(
    (tenantId: string) => {
      if (!apartmentId) return
      navigate(ROUTES.tenantUpdate.getPath(apartmentId, tenantId))
    },
    [apartmentId, navigate],
  )

  const handleRowClick = useCallback(
    (index: string) => {
      navigate(ROUTES.maintenanceDetail.getPath(apartmentId, index))
    },
    [navigate, apartmentId],
  )

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
            <TableRow className="cursor-pointer" onClick={() => handleRowClick(item.maintenanceId)} key={index}>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.buildings}</TableCell>
              <TableCell>{item.issuesDate} </TableCell>
              <TableCell>{item.appointmentDate}</TableCell>
              <TableCell>{item.servicerequest}</TableCell>
              <TableCell>
                <Badge variant={item.type}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <MaintenanceAction
                    maintenanceId={item.maintenanceId}
                    onUpdate={handleUpdateTenant}
                    onDelete={handleUpdateTenant}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar />
    </div>
  )
}

export default MaintenanceTable
