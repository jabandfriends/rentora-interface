import { Plus } from 'lucide-react'

import { Button } from '@/components/common'
import { NormalInvoiceTable } from '@/components/pages/Invoice'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { NORMAL_INVOICE_DATA, NORMAL_INVOICE_STATS } from '@/constants'

const NormalInvoice = () => {
  return (
    <>
      <PageTableHeader
        title="Invoices Management"
        description="Manage and track all custom invoices and payments"
        stats={NORMAL_INVOICE_STATS}
        actionButton={
          <Button className="flex items-center gap-2">
            <Plus size={18} /> New Invoice
          </Button>
        }
      />
      <PageTableSearch />
      <NormalInvoiceTable data={NORMAL_INVOICE_DATA} />
    </>
  )
}

export default NormalInvoice
