import type { UseFormReturn } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/common'
import { Switch } from '@/components/feature'
import type { MonthlyContractFormData } from '@/types'

type IContractIncluded = {
  form: UseFormReturn<MonthlyContractFormData>
}
const ContractIncluded = ({ form }: IContractIncluded) => {
  return (
    <div className="desktop:grid-cols-2 grid gap-4">
      <FormField
        control={form.control}
        name="utilitiesIncluded"
        render={({ field }) => (
          <FormItem className="border-theme-secondary-300 flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Utilities Included</FormLabel>
              <FormDescription>Include utilities in rental price</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="autoRenewal"
        render={({ field }) => (
          <FormItem className="border-theme-secondary-300 flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Auto Renewal</FormLabel>
              <FormDescription>Automatically renew contract</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}

export default ContractIncluded
