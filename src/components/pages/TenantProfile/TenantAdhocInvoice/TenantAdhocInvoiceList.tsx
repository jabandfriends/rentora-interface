import { Card, CardContent } from '@/components/common'
import { PageTableHeader } from '@/components/ui'

import TenantAdhocInvoiceCard from './TenantAdhocInvoiceCard'

const TenantAdhocInvoiceList = () => {
  return (
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <PageTableHeader
        title="Adhoc Invoices"
        description="Here you can view and keep track of all additional invoices assigned to you as a tenant. This includes miscellaneous charges outside of your regular rent. Stay updated and make sure you don’t miss any outstanding payments."
      />
      <CardContent>
        <TenantAdhocInvoiceCard />
      </CardContent>
    </Card>
  )
}

export default TenantAdhocInvoiceList
