import type { UseFormReturn } from 'react-hook-form'

import type { ITenant, MonthlyContractFormData } from '@/types'

import ContractCondition from './ContractCondition'
import ContractDetail from './ContractDetail'
import ContractNavigation from './ContractNavigation'
// import ContractIncluded from './ContractIncluded'
import ContractTenantAndType from './ContractTenantAndType'

type IContractMainInformation = {
  form: UseFormReturn<MonthlyContractFormData>
  tenantsData: Array<ITenant>
  handleSelectTenant: (userId: string, name: string) => void
  handleSearchTenant: (value: string) => void
  currentStep: number
  handleStepChange: (nextStep: number) => void
  onSubmit: (data: MonthlyContractFormData) => void
}
const ContractMainInformation = ({
  form,
  currentStep,
  handleStepChange,
  onSubmit,
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
      <ContractNavigation
        currentStep={currentStep}
        setCurrentStep={handleStepChange}
        onSubmit={form.handleSubmit(onSubmit)}
      />
      {/* <ContractIncluded form={form} /> */}
    </div>
  )
}

export default ContractMainInformation
