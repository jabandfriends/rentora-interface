import { PageHeader, PageSection } from '@/components/layout'
import { OverdueInvoice } from '@/components/pages/Invoice'

const OverdueInvoicePage = () => {
  return (
    <PageSection>
      <PageHeader title="Overdue Invoices" description="Manage unpaid bills and outstanding invoices" />
      <OverdueInvoice />
    </PageSection>
  )
}

export default OverdueInvoicePage
