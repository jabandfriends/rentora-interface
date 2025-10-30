import { PageHeader, PageSection } from '@/components/layout'
import { SupplyTransactionBody, SupplyTransactionsBreadcrumb } from '@/components/pages/SupplyTransactions'

const SupplyTransactions = () => {
  return (
    <PageSection>
      <SupplyTransactionsBreadcrumb />
      <PageHeader title="Supply Transactions" description="View all supply transactions here!" />
      <SupplyTransactionBody />
    </PageSection>
  )
}

export default SupplyTransactions
