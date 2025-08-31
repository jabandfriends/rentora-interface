import { SquarePen, Trash } from 'lucide-react'

import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { RECEIPT_REPORT_TABLE_HEADER } from '@/constants'

type IReceiptReportTableProps = {
  data: Array<any>
}

const ReceiptReportTable = ({ data }: IReceiptReportTableProps) => {
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {RECEIPT_REPORT_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.receipt}</TableCell>
              <TableCell>{item.tenant}</TableCell>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.issuedate}</TableCell>
              <TableCell>{item.duedate}</TableCell>
              <TableCell>
                <Badge variant="success">{item.status}</Badge>
              </TableCell>
              <TableCell>
                <SquarePen size={20} />
              </TableCell>
              <TableCell>
                <Trash size={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar />
    </div>
  )
}

export default ReceiptReportTable
