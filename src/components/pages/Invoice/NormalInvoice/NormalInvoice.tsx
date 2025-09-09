import { Plus } from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { NormalInvoiceTable } from '@/components/pages/Invoice'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { NORMAL_INVOICE_DATA, NORMAL_INVOICE_STATS, ROUTES } from '@/constants'

const NormalInvoice = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const handleCreate = useCallback(() => navigate(ROUTES.invoiceCreate.getPath(apartmentId)), [navigate, apartmentId])
  return (
    <>
      <PageTableHeader
        title="Invoices Management"
        description="Manage and track all custom invoices and payments"
        stats={NORMAL_INVOICE_STATS}
        actionButton={
          <Button className="flex items-center gap-2" onClick={handleCreate}>
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
