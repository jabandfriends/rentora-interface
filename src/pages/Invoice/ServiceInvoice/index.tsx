import { PageSection } from '@/components/layout'
import { ServiceInvoice } from '@/components/pages/Invoice'

const ServiceInvoicePage = () => {
  return (
    <PageSection className="desktop:px-8 flex w-full flex-col gap-y-5 px-4 py-5">
      <ServiceInvoice />
    </PageSection>
  )
}

export default ServiceInvoicePage
