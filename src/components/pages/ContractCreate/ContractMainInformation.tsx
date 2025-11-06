import type { UseFormReturn } from 'react-hook-form'

import type { ITenant, MonthlyContractFormData } from '@/types'

import ContractCondition from './ContractCondition'
import ContractDetail from './ContractDetail'
import ContractTenantAndType from './ContractTenantAndType'

type IContractMainInformation = {
  form: UseFormReturn<MonthlyContractFormData>
  tenantsData: Array<ITenant>
  handleSelectTenant: (userId: string, name: string) => void
  handleSearchTenant: (value: string) => void
}
const ContractMainInformation = ({
  form,
  tenantsData,
  handleSelectTenant,
  handleSearchTenant,
}: IContractMainInformation) => {
  return (
    <div className="space-y-4">
      <ContractTenantAndType
        form={form}
        usersData={tenantsData}
        handleSelectTenant={handleSelectTenant}
        handleSearchTenant={handleSearchTenant}
      />
      <ContractDetail form={form} />
      <ContractCondition form={form} />
    </div>
  )
}

export default ContractMainInformation
