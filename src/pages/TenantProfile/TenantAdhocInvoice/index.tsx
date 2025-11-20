import { PageHeader, PageSection } from '@/components/layout'
import { TenantAdhocInvoiceList } from '@/components/pages/TenantProfile/TenantAdhocInvoice'

const TenantAdhocInvoice = () => {
  return (
    <PageSection>
      <PageHeader
        title="Additonal Invoices"
        description="Here you can view and keep track of all additional invoices assigned to you as a tenant. This includes miscellaneous charges outside of your regular rent. Stay updated and make sure you don’t miss any outstanding payments."
      />
      <TenantAdhocInvoiceList />
    </PageSection>
  )
}

export default TenantAdhocInvoice
