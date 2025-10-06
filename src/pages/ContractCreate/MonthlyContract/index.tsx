import { PageSection } from '@/components/layout'
import { ContractBreadcrumb } from '@/components/pages/ContractCreate'
import { MonthlyContractBody } from '@/components/pages/ContractCreate/MonthlyContract'

const MonthlyContract = () => {
  return (
    <PageSection>
      <ContractBreadcrumb />
      <MonthlyContractBody />
    </PageSection>
  )
}

export default MonthlyContract
