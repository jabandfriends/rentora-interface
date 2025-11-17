import { CheckCircle, Clock, Download, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card, CardContent, CardDescription, CardTitle } from '@/components/common'
import { Badge, Separator } from '@/components/ui'
import { ADHOC_INVOICE_PAYMENT_STATUS } from '@/enum'
import type { IInvoiceSummary } from '@/types'
import { formatCurrency, formatDate } from '@/utilities'

type ITenantAdhocInvoiceCardProps = {
  invoice: IInvoiceSummary
}

const TenantAdhocInvoiceCard = ({ invoice }: ITenantAdhocInvoiceCardProps) => {
  const {
    statusIcon,
    statusText,
    statusVariant,
  }: {
    statusIcon: ReactNode
    statusText: string
    statusVariant: VariantProps<typeof Badge>['variant']
  } = useMemo(() => {
    switch (invoice.status) {
      case ADHOC_INVOICE_PAYMENT_STATUS.PAID:
        return {
          statusIcon: <CheckCircle size={16} />,
          statusText: 'Paid',
          statusVariant: 'success',
        }
      case ADHOC_INVOICE_PAYMENT_STATUS.UNPAID:
        return {
          statusIcon: <Clock size={16} />,
          statusText: 'Unpaid',
          statusVariant: 'warning',
        }
      case ADHOC_INVOICE_PAYMENT_STATUS.OVERDUE:
        return {
          statusIcon: <XCircle size={16} />,
          statusText: 'Overdue',
          statusVariant: 'error',
        }
      case ADHOC_INVOICE_PAYMENT_STATUS.CANCELLED:
        return {
          statusIcon: <XCircle size={16} />,
          statusText: 'Cancelled',
          statusVariant: 'error',
        }
      default:
        return {
          statusIcon: <Clock size={16} />,
          statusText: invoice.status,
          statusVariant: 'default',
        }
    }
  }, [invoice.status])

  return (
    <Card className="border-theme-secondary-300 rounded-xl border shadow-none hover:shadow">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{invoice.title}</CardTitle>
            <CardDescription>
              Invoice: {invoice.invoiceNumber} | Due:{' '}
              {invoice.dueDate ? formatDate(new Date(invoice.dueDate), 'DD/MM/YYYY') : 'N/A'}
            </CardDescription>
          </div>
          <Badge variant={statusVariant} className="capitalize">
            {statusIcon}
            {statusText}
          </Badge>
        </div>
        <Separator />
        {invoice.description && <p className="text-theme-secondary text-body-2">{invoice.description}</p>}
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-semibold">Amount</h5>
            <p className="text-theme-secondary">{formatCurrency(invoice.amount)}</p>
          </div>
          <div>
            <h5 className="font-semibold">Issue Date</h5>
            <p className="text-theme-secondary">
              {invoice.issueDate ? formatDate(new Date(invoice.issueDate), 'DD/MM/YYYY') : 'N/A'}
            </p>
          </div>
          {invoice.status === ADHOC_INVOICE_PAYMENT_STATUS.PAID && (
            <Button className="flex items-center gap-x-2" variant="outline">
              <Download size={16} />
              Receipt
            </Button>
          )}
        </div>
        {invoice.room && <div className="text-theme-secondary text-body-2">Room: {invoice.room}</div>}
        {invoice.tenant && <div className="text-theme-secondary text-body-2">Tenant: {invoice.tenant}</div>}
      </CardContent>
    </Card>
  )
}

export default TenantAdhocInvoiceCard
