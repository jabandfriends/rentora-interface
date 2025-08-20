import { Button } from '@/components/common'
import NormalInvoiceTable from '@/components/pages/NormalInvoice/NormalInvoiceTable'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { NORMAL_INVOICE_DATA, NORMAL_INVOICE_STATS } from '@/constants'

const NormalInvoice = () => {
  return (
    <>
      <PageTableHeader
        title="All Invoices"
        description="View and manage all invoices in one place. Check paid, unpaid, and overdue bills with clear details for easy tracking."
        stats={NORMAL_INVOICE_STATS}
        actionButton={<Button>New Invoice</Button>}
      />
      <PageTableSearch />
      <NormalInvoiceTable data={NORMAL_INVOICE_DATA} />
    </>
  )
}

export default NormalInvoice
