import { PageHeader, PageSection } from '@/components/layout'
import { NormalInvoice } from '@/components/pages/Invoice'

const NormalInvoicePage = () => {
  return (
    <PageSection>
      <PageHeader title="Adhoc Invoices" description="Easily manage and track all your adhoc invoices here!" />
      <NormalInvoice />
    </PageSection>
  )
}

export default NormalInvoicePage
