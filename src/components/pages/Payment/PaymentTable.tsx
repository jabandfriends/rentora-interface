import { useCallback } from 'react'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
  FieldEmpty,
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
import { PAYMENT_TABLE_HEADER } from '@/constants/payment'
import type { IPayment } from '@/types'

type PaymentTableProps = {
  data: Array<IPayment>
  onPageChange: (page: number) => void
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  totalPages: number
  totalElements: number
}

const PaymentTable = ({
  data,
  onPageChange,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
}: PaymentTableProps) => {
  const paymentStatusVariant = useCallback((status: string): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'failed':
        return 'error'
      default:
        return 'default'
    }
  }, [])
  const verificationStatusVariant = useCallback((status: string): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'verified':
        return 'success'
      case 'unverified':
        return 'secondary'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }, [])

  if (isLoading) return <PageTableLoading />
  if (isSearched && data.length === 0) {
    return <PageTableSearchEmpty message="No payments found" subMessage="No payments found for this search" />
  }
  if (!data || data.length === 0) {
    return <PageTableEmpty message="No payments found" />
  }
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {PAYMENT_TABLE_HEADER.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: IPayment, index) => (
            <TableRow
              key={
                item.paymentId +
                item.tenantName +
                item.amount +
                item.unitName +
                item.paymentStatus +
                item.verificationStatus +
                item.buildingName +
                index
              }
            >
              <TableCell className="text-theme-primary">{item.paymentId || <FieldEmpty />}</TableCell>
              <TableCell>{item.amount ? `$${item.amount.toFixed(2)}` : <FieldEmpty />}</TableCell>
              <TableCell>{item.unitName || <FieldEmpty />}</TableCell>
              <TableCell>
                <Badge variant={paymentStatusVariant(item.paymentStatus)} className="capitalize">
                  {item.paymentStatus || <FieldEmpty />}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={verificationStatusVariant(item.verificationStatus)} className="capitalize">
                  {item.verificationStatus || <FieldEmpty />}
                </Badge>
              </TableCell>
              <TableCell>
                {item.buildingName ? (
                  <a
                    href={item.buildingName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme-primary underline"
                  >
                    View
                  </a>
                ) : (
                  <FieldEmpty />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-y-2">
        <PaginationBar
          onPageChange={onPageChange}
          isLoading={isLoading}
          page={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
        />
      </div>
    </div>
  )
}

export default PaymentTable
