import { SquarePen } from 'lucide-react'

import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { ROOM_REPORT_TABLE_HEADER } from '@/constants'

type IRoomReportTableProps = {
  data: Array<any>
}

const RoomReportTable = ({ data }: IRoomReportTableProps) => {
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {ROOM_REPORT_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* RECHECK : API TYPE */}
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.tenant}</TableCell>
              <TableCell>{item.reservationHolder}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>{item.issueDate}</TableCell>
              <TableCell>{item.checkoutDate}</TableCell>
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

export default RoomReportTable
