import { PageHeader, PageSection } from '@/components/layout'
import { Payment } from '@/components/pages/Payment'

const PaymentPage = () => {
  return (
    <PageSection>
      <PageHeader title="Payment" description="Manage and view all payments" />
      <Payment />
    </PageSection>
  )
}

export default PaymentPage
