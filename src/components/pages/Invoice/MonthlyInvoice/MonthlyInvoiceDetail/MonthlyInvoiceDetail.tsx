import { ArrowLeft, Download, Send } from 'lucide-react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Spinner } from '@/components/common'
import { BillSection, MonthlyInvoiceDetailTable } from '@/components/pages/Invoice'
import { PageTableEmpty } from '@/components/ui'
import { useRentoraApiMonthlyInvoiceDetail } from '@/hooks'
import { formatCurrency, formatDate } from '@/utilities'

const MonthlyInvoiceDetail = () => {
  const navigate: NavigateFunction = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: monthlyInvoice, isLoading: isMonthlyInvoiceDetailLoading } = useRentoraApiMonthlyInvoiceDetail({
    invoiceNumber: id,
  })

  if (isMonthlyInvoiceDetailLoading) {
    return (
      <PageTableEmpty
        icon={<Spinner />}
        message="Your monthly invoice is loading..."
        description="Hold on, we're loading your monthly invoice."
      />
    )
  }
  if (!monthlyInvoice) {
    return <PageTableEmpty message="Your monthly invoice is not found..." />
  }
  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex items-center gap-4">
        <Button className="flex items-center gap-x-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-5" />
          Back
        </Button>
      </div>
      <div className="bg-theme-light space-y-6 rounded-xl shadow-sm">
        {/* Invoice Detail */}
        <div>
          {/* Invoice Header */}
          <div className="space-y-4 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2>RENT INVOICE</h2>
                <p className="text-body-2 text-theme-secondary">Invoice #{monthlyInvoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <h4 className="text-theme-secondary">Issue Date</h4>
                <p>{formatDate(new Date(monthlyInvoice.createdAt), 'DD/MM/YYYY')}</p>
              </div>
            </div>

            <BillSection invoice={monthlyInvoice} />
          </div>

          {/* Invoice Items */}
          <div className="p-8">
            <MonthlyInvoiceDetailTable invoice={monthlyInvoice} />

            {/* Total */}
            <div>
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <h4 className="text-theme-primary">TOTAL AMOUNT (THB):</h4>
                    <h4>{formatCurrency(monthlyInvoice.totalAmount)}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-x-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button className="flex items-center gap-x-2">
                <Send className="h-4 w-4" />
                Send to Tenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyInvoiceDetail
