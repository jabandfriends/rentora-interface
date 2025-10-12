import { PaginationBar } from '@/components/feature'
import {
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
import { RECEIPT_REPORT_TABLE_HEADER } from '@/constants'

type IReceiptReportTableProps = {
  data: Array<any>
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

const ReceiptReportTable = ({
  data,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}: IReceiptReportTableProps) => {
  if (isLoading) {
    return <PageTableLoading />
  }

  if (isSearched && !isLoading && (!data || data.length === 0)) {
    return (
      <PageTableSearchEmpty message="No receipt report found" subMessage="No receipt report found for this search" />
    )
  }

  if (!isLoading && (!data || data.length === 0)) {
    return <PageTableEmpty message="No receipt report found" />
  }

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
          {data.map((item, idx) => (
            <TableRow key={item.adhocNumber ?? idx}>
              <TableCell>{item.adhocNumber}</TableCell>
              <TableCell>{item.tenantUserId}</TableCell>
              <TableCell>{item.unitId}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.finalAmount}</TableCell>
              <TableCell>{item.invoiceDate}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>{item.paymentStatus}</TableCell>
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

export default ReceiptReportTable
