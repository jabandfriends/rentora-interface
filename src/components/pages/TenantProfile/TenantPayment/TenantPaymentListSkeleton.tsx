import { Card } from '@/components/common'
import { PageTableHeader } from '@/components/ui'

import TenantPaymentSkeletonCard from './TenantPaymentCardSkeleton'

const TenantPaymentListSkeleton = () => {
  return (
    <Card className="justify-start space-y-2 rounded-xl shadow">
      <PageTableHeader
        title="Rental Payments"
        description="View your rental payments and manage your payment methods"
      />
      <div className="desktop:grid-cols-2 grid gap-4">
        {Array.from({ length: 5 }).map((_, index: number) => (
          <TenantPaymentSkeletonCard key={index} />
        ))}
      </div>
    </Card>
  )
}

export default TenantPaymentListSkeleton
