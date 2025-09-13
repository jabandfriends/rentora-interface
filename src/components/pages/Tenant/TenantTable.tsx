import { ChevronDown } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'
import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { TENANT_ACTION } from '@/constants'
import { TENANTS_TABLE_HEADER } from '@/constants/tenantsmanage'
//RECHECK : api type
type TenantsTableProps = {
  data: Array<any>
}
//RECHECK : API TYPE
const TenantTable = ({ data }: TenantsTableProps) => {
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
          {/* RECHECK : API TYPE */}
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.tenantsid}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.floor}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.createdate}</TableCell>
              <TableCell>
                <Badge variant="success">{item.status}</Badge>
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
      <PaginationBar />
    </div>
  )
}

export default TenantTable
