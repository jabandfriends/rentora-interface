import OverdueInvoiceTable from '@/components/pages/OverdueInvoice/OverdueInvoiceTable'
import { PageTableHeader, PageTableSearch, PaginationBar } from '@/components/ui'
import { OVERDUE_INVOICE_DATA, OVERDUE_INVOICE_STATS } from '@/constants'

const OverdueInvoice = () => {
  return (
    <>
      <PageTableHeader
        title="Overdue Invoices"
        description="Manage unpaid bills and outstanding invoices. Track due dates and make quick payments in one place."
        stats={OVERDUE_INVOICE_STATS}
      />
      <PageTableSearch />
      <OverdueInvoiceTable data={OVERDUE_INVOICE_DATA} />
      <PaginationBar />
    </>
  )
}

export default OverdueInvoice
