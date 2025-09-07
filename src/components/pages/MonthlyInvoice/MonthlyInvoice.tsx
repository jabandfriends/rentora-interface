import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import MonthlyInvoiceBody from '@/components/pages/MonthlyInvoice/MonthlyInvoiceBody'
import { PageTableBar, PageTableHeader, PageTableSearch } from '@/components/ui'
import { NORMAL_INVOICE_STATS, ROUTES } from '@/constants'

const MonthlyInvoice = () => {
  const navigate = useNavigate()
  return (
    <>
      <PageTableHeader
        title="Monthly Invoices"
        description="Manage monthly rent invoices"
        stats={NORMAL_INVOICE_STATS}
        actionButton={
          <Button onClick={() => navigate(ROUTES.monthlyInvoiceCreate.path)} className="flex items-center gap-2">
            <Plus size={18} /> New Invoice
          </Button>
        }
      />
      <PageTableBar title="Total Amount" count="฿8,000,000" />
      <PageTableSearch />
      <MonthlyInvoiceBody />
    </>
  )
}

export default MonthlyInvoice
