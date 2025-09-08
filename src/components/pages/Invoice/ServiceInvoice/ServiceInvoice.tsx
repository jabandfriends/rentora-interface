import { Button } from '@/components/common'
import { ServiceInvoiceTable } from '@/components/pages/Invoice'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { SERVICE_INVOICE_DATA, SERVICE_INVOICE_STATS } from '@/constants'

const ServiceInvoice = () => {
  return (
    <>
      <PageTableHeader
        title="Service Invoices"
        description="Manage and track all custom invoices and payments"
        stats={SERVICE_INVOICE_STATS}
        actionButton={<Button>New Invoice</Button>}
      />
      <PageTableSearch />
      <ServiceInvoiceTable data={SERVICE_INVOICE_DATA} />
    </>
  )
}

export default ServiceInvoice
