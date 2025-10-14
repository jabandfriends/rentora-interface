import { PageSection } from '@/components/layout'
import { ContractBody, ContractBreadcrumb } from '@/components/pages/ContractCreate'

const ContractCreate = () => {
  return (
    <PageSection>
      <ContractBreadcrumb />
      <ContractBody />
    </PageSection>
  )
}

export default ContractCreate
