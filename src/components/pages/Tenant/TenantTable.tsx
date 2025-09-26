import { ChevronDown, PackageOpen } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { TENANT_ACTION } from '@/constants'
import { TENANTS_TABLE_HEADER } from '@/constants/tenantsmanage'
import type { IPaginate, ITenant } from '@/types'
import { formatTimestamp } from '@/utilities'

import TenantTableLoading from './TenantTableLoading'

type TenantsTableProps = {
  data: Array<ITenant>
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

const TenantTable = ({ data, isLoading, currentPage, totalPages, totalElements, onPageChange }: TenantsTableProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-theme-light flex h-1/2 flex-col items-center justify-center rounded-lg p-5">
        <PackageOpen size={50} />
        <p className="text-theme-secondary text-body-1">No tenants found</p>
      </div>
    )
  }
  if (isLoading) {
    return <TenantTableLoading />
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="vanilla">
                      <ChevronDown size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={10}>
                    {TENANT_ACTION.map((action) => (
                      <DropdownMenuItem key={action}>{action}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
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
