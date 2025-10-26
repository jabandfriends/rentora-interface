import { PageTableBody, PageTableHeader } from '@/components/ui'

import SupplyTransactionTable from './SupplyTransactionTable'

const SupplyTransactionBody = () => {
  return (
    <PageTableBody className="space-y-4">
      <PageTableHeader title="Supply Transactions" description="View all supply transactions here!" />
      <SupplyTransactionTable />
    </PageTableBody>
  )
}

export default SupplyTransactionBody
