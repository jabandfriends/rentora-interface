import { PageHeader, PageSection } from '@/components/layout'
import { MonthlyInvoice } from '@/components/pages/Invoice'

const MonthlyInvoicePage = () => {
  return (
    <PageSection>
      <PageHeader title="Monthly Invoices" description="Manage monthly rent invoices" />
      <MonthlyInvoice />
    </PageSection>
  )
}

export default MonthlyInvoicePage
