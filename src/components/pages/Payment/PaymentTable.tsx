import { Calendar } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
  EmptyPage,
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
import { PAYMENT_TABLE_HEADER } from '@/constants'
import { PaymentStatus, VerifiedStatus } from '@/enum'
import type { IPayment, Maybe } from '@/types'
import { formatCurrency } from '@/utilities'

import PaymentAction from './PaymentAction'
import PaymentReceiptModal from './PaymentReceiptModal'
import PaymentUpdateModal from './PaymentUpdateModal'

type PaymentTableProps = {
  data: Array<IPayment>
  onPageChange: (page: number) => void
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  totalPages: number
  totalElements: number
  isGenMonthSelected: Maybe<string>
}

const PaymentTable = ({
  data,
  onPageChange,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
  isGenMonthSelected,
}: PaymentTableProps) => {
  //modals
  const [isPaymentUpdateModalOpen, setIsPaymentUpdateModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)
  const [isPaymentReceiptModalOpen, setIsPaymentReceiptModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)

  //selected payment
  const [selectedPayment, setSelectedPayment]: [Maybe<IPayment>, Dispatch<SetStateAction<Maybe<IPayment>>>] =
    useState<Maybe<IPayment>>(null)

  //handle open payment update modal
  const handleOpenPaymentUpdateModal = useCallback(
    (payment: IPayment) => {
      if (!payment) return
      setSelectedPayment(payment)
      setIsPaymentUpdateModalOpen(true)
    },
    [setSelectedPayment, setIsPaymentUpdateModalOpen],
  )

  //handle open payment receipt modal
  const handleOpenPaymentReceiptModal = useCallback(
    (payment: IPayment) => {
      if (!payment) return
      setSelectedPayment(payment)
      setIsPaymentReceiptModalOpen(true)
    },
    [setSelectedPayment, setIsPaymentReceiptModalOpen],
  )

  const paymentStatusVariant = useCallback((status: string): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return 'success'
      case PaymentStatus.PENDING:
        return 'warning'
      case PaymentStatus.FAILED:
        return 'error'
      default:
        return 'default'
    }
  }, [])

  const verificationStatusVariant = useCallback((status: string): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case VerifiedStatus.VERIFIED:
        return 'success'
      case VerifiedStatus.PENDING:
        return 'warning'
      case VerifiedStatus.REJECTED:
        return 'error'
      default:
        return 'default'
    }
  }, [])

  if (!isGenMonthSelected) {
    return (
      <EmptyPage
        icon={<Calendar size={36} />}
        title="No meter reading month selected"
        description="Please select a meter reading month to continue"
      />
    )
  }
  if (isLoading) return <PageTableLoading />
  if (isSearched && data.length === 0) {
    return <PageTableSearchEmpty message="No payments found" subMessage="No payments found for this search" />
  }
  if (!data || data.length === 0) {
    return <PageTableEmpty message="No payments found" />
  }
  return (
    <div className="flex flex-col gap-y-3 rounded-lg">
      <PaymentUpdateModal
        selectedPayment={selectedPayment}
        open={isPaymentUpdateModalOpen}
        onOpenChange={setIsPaymentUpdateModalOpen}
      />
      <PaymentReceiptModal
        open={isPaymentReceiptModalOpen}
        onOpenChange={setIsPaymentReceiptModalOpen}
        receiptUrl={selectedPayment?.receiptUrl || ''}
      />
      <Table>
        <TableHeader>
          <TableRow>
            {PAYMENT_TABLE_HEADER.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: IPayment) => (
            <TableRow key={item.paymentId}>
              <TableCell className="text-theme-primary">{item.paymentNumber || <FieldEmpty />}</TableCell>
              <TableCell>{item.unitName || <FieldEmpty />}</TableCell>
              <TableCell>{item.buildingName || <FieldEmpty />}</TableCell>
              <TableCell>{item.amount ? formatCurrency(item.amount) : <FieldEmpty />}</TableCell>
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
                <PaymentAction
                  payment={item}
                  onOpenPaymentReceiptModal={() => handleOpenPaymentReceiptModal(item)}
                  onOpenPaymentUpdateModal={() => handleOpenPaymentUpdateModal(item)}
                />
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
