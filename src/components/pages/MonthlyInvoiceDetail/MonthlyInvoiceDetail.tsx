import { ArrowLeft, Download, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import { BillSection, MonthlyInvoiceDetailTable } from '@/components/pages/MonthlyInvoiceDetail'

const MonthlyInvoiceDetail = () => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto flex flex-col gap-y-5 space-y-4 py-5">
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
                <p className="text-body-2 text-theme-secondary">Invoice #INV-202409-00001</p>
              </div>
              <div className="text-right">
                <h4 className="text-theme-secondary">Issue Date</h4>
                <p>9/1/2024</p>
              </div>
            </div>

            <BillSection />
          </div>

          {/* Invoice Items */}
          <div className="p-8">
            <MonthlyInvoiceDetailTable />

            {/* Total */}
            <div>
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <h4 className="text-theme-primary">TOTAL AMOUNT:</h4>
                    <h4>฿11,736</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
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
