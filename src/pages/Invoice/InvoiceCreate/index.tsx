import { PageSection } from '@/components/layout'
import AdhocBody from '@/components/pages/Invoice/InvoiceCreate/AdhocBody'
import AdhocBreadcrumb from '@/components/pages/Invoice/InvoiceCreate/AdhocBreadcrumb'

const InvoiceCreatePage = () => {
  return (
    <PageSection>
      <AdhocBreadcrumb />
      <AdhocBody />
    </PageSection>
  )
}

export default InvoiceCreatePage
