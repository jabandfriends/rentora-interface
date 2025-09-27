import { PackageOpen } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { PaginationBar } from '@/components/feature'
import { TenantAction, TenantTableLoading } from '@/components/pages/Tenant'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { ROUTES } from '@/constants'
import { TENANTS_TABLE_HEADER } from '@/constants/tenantsmanage'
import type { IPaginate, ITenant } from '@/types'
import { formatTimestamp } from '@/utilities'

type TenantsTableProps = {
  data: Array<ITenant>
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

const TenantTable = ({ data, isLoading, currentPage, totalPages, totalElements, onPageChange }: TenantsTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const handleUpdateTenant = useCallback(
    (tenantId: string) => {
      if (!apartmentId) return
      navigate(ROUTES.tenantUpdate.getPath(apartmentId, tenantId))
    },
    [apartmentId, navigate],
  )
  const handlePasswordUpdateTenant = useCallback(
    (tenantId: string) => {
      if (!apartmentId) return
      navigate(ROUTES.tenantUpdatePassword.getPath(apartmentId, tenantId))
    },
    [apartmentId, navigate],
  )
  if (isLoading) {
    return <TenantTableLoading />
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-theme-light flex h-1/2 flex-col items-center justify-center rounded-lg p-5">
        <PackageOpen size={50} />
        <p className="text-theme-secondary text-body-1">No tenants found</p>
      </div>
    )
  }

  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {TENANTS_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>TENANT-{index + 1}</TableCell>
              <TableCell>{item.fullName ? item.fullName : 'N/A'}</TableCell>
              <TableCell>{item.email ? item.email : 'N/A'}</TableCell>
              <TableCell>{item.unitName ? item.unitName : 'N/A'}</TableCell>
              <TableCell>{formatTimestamp(item.createdAt)}</TableCell>
              <TableCell>
                {item.accountStatus ? <Badge variant="success">Active</Badge> : <Badge variant="error">Inactive</Badge>}
              </TableCell>
              <TableCell>
                {item.occupiedStatus ? (
                  <Badge variant="success">Occupied</Badge>
                ) : (
                  <Badge variant="error">Unoccupied</Badge>
                )}
              </TableCell>

              <TableCell>
                <TenantAction
                  userId={item.userId}
                  onUpdate={handleUpdateTenant}
                  onPasswordUpdate={handlePasswordUpdateTenant}
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

export default TenantTable
