import { Card } from '@/components/common'
import { PageTableHeader } from '@/components/ui'

import TenantPaymentCard from './TenantPaymentCard'

const TenantPaymentList = () => {
  return (
    <Card className="justify-start space-y-2 rounded-xl shadow">
      <PageTableHeader
        title="Payment History"
        description="View your payment history and manage your payment methods"
      />
      <div className="desktop:grid-cols-2 grid gap-4">
        <TenantPaymentCard />
        <TenantPaymentCard />
        <TenantPaymentCard />
      </div>
    </Card>
  )
}

export default TenantPaymentList
