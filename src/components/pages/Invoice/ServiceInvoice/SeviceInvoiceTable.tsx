import { SquarePen } from 'lucide-react'

import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { SERVICE_INVOICE_TABLE_HEADER } from '@/constants'

interface ServiceInvoiceTableProps {
  data: Array<any>
}

const ServiceInvoiceTable = ({ data }: ServiceInvoiceTableProps) => {
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {SERVICE_INVOICE_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.invoice}</TableCell>
              <TableCell>{item.tenant}</TableCell>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.issueDate}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>
                <Badge variant={item.type}>{item.status}</Badge>
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

export default ServiceInvoiceTable
