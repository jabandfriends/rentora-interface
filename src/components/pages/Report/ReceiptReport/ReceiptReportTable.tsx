import { useCallback } from 'react'
import type { VariantProps } from 'tailwind-variants'

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
import { RECEIPT_REPORT_TABLE_HEADER } from '@/constants'
import type { IReportReceipt } from '@/types'
import { formatCurrency } from '@/utilities'

type IReceiptReportTableProps = {
  data: Array<IReportReceipt>
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
  const badgePaymentStatusBadgeVariant = useCallback((paymentStatus: string): VariantProps<typeof Badge>['variant'] => {
    switch (paymentStatus) {
      case 'paid':
        return 'success'
      case 'unpaid':
        return 'error'
      case 'overdue':
        return 'warning'
      default:
        return 'default'
    }
  }, [])
  if (isLoading) {
    return <PageTableLoading />
  }

  if (isSearched && (!data || data.length === 0)) {
    return (
      <PageTableSearchEmpty message="No receipt report found" subMessage="No receipt report found for this search" />
    )
  }

  if (!data || data.length === 0) {
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
          {data.map((item: IReportReceipt) => (
            <TableRow key={item.id}>
              <TableCell>{item.adhocNumber}</TableCell>
              <TableCell>{item.tenantUserId}</TableCell>
              <TableCell>{item.unitId}</TableCell>
              <TableCell>{item.description ?? 'N/A'}</TableCell>
              <TableCell>{formatCurrency(item.finalAmount)}</TableCell>
              <TableCell>{item.invoiceDate}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>
                <Badge className="capitalize" variant={badgePaymentStatusBadgeVariant(item.paymentStatus)}>
                  {item.paymentStatus}
                </Badge>
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

export default ReceiptReportTable
