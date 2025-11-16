import { PageHeader, PageSection } from '@/components/layout'
import { TenantPaymentList } from '@/components/pages/TenantProfile/TenantPayment'

const TennantPayment = () => {
  return (
    <PageSection>
      <PageHeader title="Rental Payments" description="Manage your payments and view your payment history" />
      <TenantPaymentList />
    </PageSection>
  )
}

export default TennantPayment
