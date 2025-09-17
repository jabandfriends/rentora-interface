import { PageHeader, PageSection } from '@/components/layout'
import { InvoiceCreateForm } from '@/components/pages/Invoice/InvoiceCreate'

const InvoiceCreatePage = () => {
  const handleSubmit = (data: any) => {
    console.log('Form submitted with data:', data)
  }

  return (
    <PageSection>
      <PageHeader title="Invoice Create" description="Fill in the details to issue a new invoice." />
      <InvoiceCreateForm onSubmit={handleSubmit} />
    </PageSection>
  )
}

export default InvoiceCreatePage
