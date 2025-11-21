import { ArrowLeft, Download } from 'lucide-react'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Spinner } from '@/components/common'
import { BillSection, MonthlyInvoiceDetailTable } from '@/components/pages/Invoice'
import { EmptyPage } from '@/components/ui'
import { useRentoraApiMonthlyInvoiceDetail } from '@/hooks'
import { exportInvoiceToPDF, formatCurrency, formatDate } from '@/utilities'

import MonthlyInvoiceDetailUnitAdhocInvoice from './MonthlyInvoiceDetailUnitAdhocInvoice'
import MonthlyInvoiceDetailUnitService from './MonthlyInvoiceDetailUnitService'

const MonthlyInvoiceDetail = () => {
  const navigate: NavigateFunction = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: monthlyInvoice, isLoading: isMonthlyInvoiceDetailLoading } = useRentoraApiMonthlyInvoiceDetail({
    invoiceNumber: id,
  })

  const [isExportingInvoicePDF, setIsExportingInvoicePDF] = useState<boolean>(false)

  const handleExportInvoicePDF = useCallback(async () => {
    if (!monthlyInvoice) return
    try {
      setIsExportingInvoicePDF(true)
      await exportInvoiceToPDF(monthlyInvoice)
      toast.success('Invoice PDF exported successfully')
      //eslint-disable-next-line
    } catch (_) {
      toast.error('Failed to export invoice PDF')
    } finally {
      setIsExportingInvoicePDF(false)
    }
  }, [monthlyInvoice])

  if (isMonthlyInvoiceDetailLoading) {
    return (
      <EmptyPage
        icon={<Spinner />}
        title="Your monthly invoice is loading..."
        description="Hold on, we're loading your monthly invoice."
      />
    )
  }
  if (!monthlyInvoice) {
    return (
      <EmptyPage
        title="Your monthly invoice is not found..."
        description="Your monthly invoice is not found... Please try again later."
      />
    )
  }
  return (
    <div>
      <Card className="flex w-full flex-col gap-y-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <Button className="flex items-center gap-x-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="size-5" />
            Back
          </Button>
        </div>
        <div className="space-y-6 rounded-xl">
          {/* Invoice Detail */}
          <div className="space-y-4">
            {/* Invoice Header */}
            <div className="space-y-4">
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
            <div className="space-y-4">
              <MonthlyInvoiceDetailTable invoice={monthlyInvoice} />
              {/* serviceList section */}
              <MonthlyInvoiceDetailUnitService serviceList={monthlyInvoice.serviceList} />

              {/* adhoc invoices section */}
              <MonthlyInvoiceDetailUnitAdhocInvoice adhocInvoices={monthlyInvoice.unitAdhocInvoices} />

              {/* Total */}
              <div className="desktop:flex-row flex flex-col justify-between">
                {/* payment method */}
                <div className="flex justify-between py-2">
                  <h4 className="text-theme-primary">PAYMENT METHOD:</h4>
                  <h4>
                    {monthlyInvoice.bankAccountNumber} - {monthlyInvoice.bankName} - {monthlyInvoice.accountHolderName}
                  </h4>
                </div>
                <div className="flex justify-between py-2">
                  <h4 className="text-theme-primary">TOTAL AMOUNT (THB):</h4>
                  <h4>{formatCurrency(monthlyInvoice.totalAmount)}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button
            disabled={isExportingInvoicePDF}
            className="desktop:w-auto flex w-full items-center gap-x-2"
            onClick={handleExportInvoicePDF}
          >
            {isExportingInvoicePDF && <Spinner />}
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default MonthlyInvoiceDetail
