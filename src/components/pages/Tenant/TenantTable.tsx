import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import { TenantAction } from '@/components/pages/Tenant'
import {
  Badge,
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
import { TENANTS_TABLE_HEADER } from '@/constants/tenantsmanage'
import { TENANT_ROLE } from '@/enum'
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

  const occupiedStatusBadgeVariant = useCallback(
    (occupiedStatus: boolean): { variant: VariantProps<typeof Badge>['variant']; label: string } => {
      switch (occupiedStatus) {
        case true:
          return { variant: 'success', label: 'Occupied' }
        case false:
          return { variant: 'error', label: 'Unoccupied' }
        default:
          return { variant: 'default', label: 'N/A' }
      }
    },
    [],
  )

  const userStatusBadgeVariant = useCallback(
    (userStatus: boolean): { variant: VariantProps<typeof Badge>['variant']; label: string } => {
      switch (userStatus) {
        case true:
          return { variant: 'success', label: 'Active' }
        case false:
          return { variant: 'error', label: 'Inactive' }
      }
    },
    [],
  )

  const roleBadgeVariant = useCallback(
    (role: TENANT_ROLE): { variant: VariantProps<typeof Badge>['variant']; label: string } => {
      switch (role) {
        case TENANT_ROLE.TENANT:
          return { variant: 'success', label: 'Tenant' }
        case TENANT_ROLE.ADMIN:
          return { variant: 'default', label: 'Admin' }
        case TENANT_ROLE.MAINTENANCE:
          return { variant: 'warning', label: 'Maintenance' }
        case TENANT_ROLE.ACCOUNTING:
          return { variant: 'error', label: 'Accounting' }
        default:
          return { variant: 'default', label: 'N/A' }
      }
    },
    [],
  )
  if (isLoading) {
    return <PageTableLoading />
  }

  if (!data || data.length === 0) {
    return <PageTableEmpty message="No tenants found" />
  }

  return (
    <div className="flex flex-col gap-y-3">
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
              <TableCell>{item.fullName ? item.fullName : 'N/A'}</TableCell>
              <TableCell>{item.email ? item.email : 'N/A'}</TableCell>
              <TableCell>{item.unitName ? item.unitName : 'N/A'}</TableCell>
              <TableCell>{formatTimestamp(item.createdAt, 'DD MMM YYYY')}</TableCell>
              <TableCell>
                <Badge variant={roleBadgeVariant(item.role).variant}>{roleBadgeVariant(item.role).label}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={userStatusBadgeVariant(item.isActive).variant}>
                  {userStatusBadgeVariant(item.isActive).label}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={occupiedStatusBadgeVariant(item.occupiedStatus).variant}>
                  {occupiedStatusBadgeVariant(item.occupiedStatus).label}
                </Badge>
              </TableCell>

              <TableCell>
                <TenantAction
                  userId={item.apartmentUserId}
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
