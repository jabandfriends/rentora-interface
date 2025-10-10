import { PaginationBar } from '@/components/feature'
import {
  Badge,
  PageTableEmpty,
  PageTableLoading,
  PageTableSearchEmpty,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ROOM_REPORT_TABLE_HEADER } from '@/constants'
import type { IReportRoom } from '@/types'

type IRoomReportTableProps = {
  data: Array<any>
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

const RoomReportTable = ({
  data,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}: IRoomReportTableProps) => {
  if (isLoading) {
    return <PageTableLoading />
  }
  if (isSearched && !isLoading && data?.length === 0) {
    return <PageTableSearchEmpty message="No room report found" subMessage="No room report found for this search" />
  }
  if (!isLoading && (!data || data.length === 0)) {
    return <PageTableEmpty message="No room report found" />
  }
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
          {data.map((item: IReportRoom) => (
            <TableRow key={item.roomName + item.roomName}>
              <TableCell>{item.roomName}</TableCell>
              <TableCell>{item.tenantName}</TableCell>
              <TableCell>{item.reservedName}</TableCell>
              <TableCell>{item.totalAmount}</TableCell>
              <TableCell>{item.issueDate}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>{item.checkoutDate}</TableCell>
              <TableCell>
                <Badge variant="success">{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default RoomReportTable
