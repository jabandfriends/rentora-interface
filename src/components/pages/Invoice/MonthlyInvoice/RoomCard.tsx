import { type HTMLAttributes, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card } from '@/components/common'
import { Badge } from '@/components/ui'
import { ROUTES } from '@/constants'
import { MonthlyInvoicePaymentStatus } from '@/enum'
import type { IMonthlyInvoice } from '@/types'
import { cn, formatCurrency } from '@/utilities'

type IRoomCardProps = HTMLAttributes<HTMLDivElement> & {
  invoice: IMonthlyInvoice
}
const RoomCard = ({ className, invoice, ...props }: IRoomCardProps) => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const paymentStatusBadgeVariant = useCallback(
    (paymentStatus: MonthlyInvoicePaymentStatus): VariantProps<typeof Badge>['variant'] => {
      switch (paymentStatus) {
        case MonthlyInvoicePaymentStatus.PAID:
          return 'success'
        case MonthlyInvoicePaymentStatus.UNPAID:
          return 'warning'
        case MonthlyInvoicePaymentStatus.OVERDUE:
          return 'error'
      }
    },
    [],
  )

  const handleMonthlyInvoiceDetail = useCallback(() => {
    navigate(ROUTES.monthlyInvoiceDetail.getPath(apartmentId, invoice.invoiceNumber))
  }, [apartmentId, invoice.invoiceNumber, navigate])
  return (
    <Card
      className={cn('border-theme-secondary-300 hover:bg-theme-secondary-100 rounded-2xl border py-5', className)}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between">
          <h4>{invoice.unitName}</h4>
          <Badge className="capitalize" variant={paymentStatusBadgeVariant(invoice.paymentStatus)}>
            {invoice.paymentStatus}
          </Badge>
        </div>
        <p className="text-theme-secondary-500">{invoice.tenantName}</p>
      </div>
      <div className="text-theme-secondary flex flex-col">
        <div className="flex justify-between">
          <p>Rent :</p>
          <p>{formatCurrency(invoice.rentAmount)}</p>
        </div>
        <div className="flex justify-between">
          <p>Power : </p>
          <p>{formatCurrency(invoice.electricAmount)}</p>
        </div>
        <div className="flex justify-between">
          <p>Water : </p>
          <p>{formatCurrency(invoice.waterAmount)}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h4>Total :</h4>
          <p className="text-theme-primary">{formatCurrency(invoice.totalAmount)}</p>
        </div>
        <span className="text-theme-secondary">Invoice : {invoice.invoiceNumber}</span>
      </div>
      <Button onClick={handleMonthlyInvoiceDetail} block>
        View
      </Button>
    </Card>
  )
}

export default RoomCard
