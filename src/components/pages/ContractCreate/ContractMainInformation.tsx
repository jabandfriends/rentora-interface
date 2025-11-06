import { CheckCircle2, User } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/common'
import type { MonthlyContractFormData } from '@/types'

import ContractCondition from './ContractCondition'
import ContractDetail from './ContractDetail'
import { TenantSelectModal } from './TenantSelectModal'

type IContractMainInformation = {
  form: UseFormReturn<MonthlyContractFormData>
  handleSelectTenant: (userId: string, name: string) => void
}
const ContractMainInformation = ({ form, handleSelectTenant }: IContractMainInformation) => {
  const [isTenantSelectModalOpen, setIsTenantSelectModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)

  const handleOpenTenantSelectModal = useCallback(() => {
    setIsTenantSelectModalOpen(true)
  }, [])

  const [tenantName, tenantId]: [string, string] = form.watch(['tenantName', 'tenantId'])
  return (
    <div className="space-y-4">
      <TenantSelectModal
        selectedTenantId={tenantId}
        onSelectTenant={handleSelectTenant}
        onOpenChange={setIsTenantSelectModalOpen}
        isOpen={isTenantSelectModalOpen}
      />

      <FormField
        control={form.control}
        name="tenantId"
        render={() => (
          <FormItem>
            <FormLabel>Tenant</FormLabel>

            <FormControl>
              <Button block type="button" variant="outline" onClick={handleOpenTenantSelectModal}>
                Select Tenant
              </Button>
            </FormControl>
            <FormDescription>Please select a tenant to create a contract</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {tenantName && (
        <div className="border-theme-secondary-300 group inline-flex items-center gap-3 rounded-lg border px-4 py-3 shadow-sm duration-300 hover:shadow-md">
          {/* Icon with gradient background */}
          <div className="flex size-10 items-center justify-center rounded-lg shadow-sm duration-300 group-hover:scale-110">
            <User className="size-5 text-white" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h4 className="uppercase">Selected Tenant</h4>
            <p className="text-theme-secondary-600 text-body-2">{tenantName}</p>
          </div>

          {/* Check icon */}
          <CheckCircle2 className="text-theme-success size-5 flex-shrink-0" />
        </div>
      )}

      <ContractDetail form={form} />
      <ContractCondition form={form} />
    </div>
  )
}

export default ContractMainInformation
