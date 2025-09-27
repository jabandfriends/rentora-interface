import { Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { MonthlyInvoiceBody } from '@/components/pages/Invoice'
import { PageTableBar, PageTableHeader } from '@/components/ui'
import { NORMAL_INVOICE_STATS, ROUTES } from '@/constants'

const MonthlyInvoice = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  return (
    <>
      <PageTableHeader
        title="Monthly Invoices"
        description="Manage monthly rent invoices"
        stats={NORMAL_INVOICE_STATS}
        actionButton={
          <Button
            onClick={() => navigate(ROUTES.monthlyInvoiceCreate.getPath(apartmentId))}
            className="flex items-center gap-2"
          >
            <Plus size={18} /> New Invoice
          </Button>
        }
      />
      <PageTableBar title="Total Amount" count="฿8,000,000" />
      {/* <PageTableSearch /> */}
      <MonthlyInvoiceBody />
    </>
  )
}

export default MonthlyInvoice
