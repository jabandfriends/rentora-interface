import type { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { ContractType } from '@/constants'
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

      <FormField
        control={form.control}
        name="rentalType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rental Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select a rental type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(ContractType).map(([key, value]) => (
                  <SelectItem className="capitalize" key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ContractTenantAndType
