import { SquarePen } from 'lucide-react'

import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { TENANTS_TABLE_HEADER } from '@/constants/tenantsmanage'

//RECHECK : api type
type TenantsTableProps = {
  data: Array<any>
}
//RECHECK : API TYPE
const TenantsTable = ({ data }: TenantsTableProps) => {
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
                <SquarePen size={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar />
    </div>
  )
}

export default TenantsTable
