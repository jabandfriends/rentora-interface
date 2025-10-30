import type { UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common'
import type { ITenant, MonthlyContractFormData } from '@/types'

import UserCombobox from './UserCombobox'

type IContractTenantAndType = {
  form: UseFormReturn<MonthlyContractFormData>
  handleSelectTenant: (userId: string, name: string) => void
  handleSearchTenant: (value: string) => void
  usersData: Array<ITenant>
}
const ContractTenantAndType = ({ form, usersData, handleSelectTenant, handleSearchTenant }: IContractTenantAndType) => {
  return (
    <div className="desktop:grid-cols-2 grid">
      <FormField
        control={form.control}
        name="tenantId"
        render={() => (
          <FormItem>
            <FormLabel>Tenant</FormLabel>
            <FormControl>
              <UserCombobox users={usersData} onSearchTenant={handleSearchTenant} onSelectTenant={handleSelectTenant} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ContractTenantAndType
