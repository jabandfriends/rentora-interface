import type { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputNumber,
} from '@/components/common'
import { Switch } from '@/components/feature'
import type { MonthlyContractFormData } from '@/types'

type IContractIncluded = {
  form: UseFormReturn<MonthlyContractFormData>
}
const ContractIncluded = ({ form }: IContractIncluded) => {
  const [autoRenewal]: [boolean] = form.watch(['autoRenewal'])
  return (
    <div className="grid gap-4">
      <div>
        <FormField
          control={form.control}
          name="autoRenewal"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
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
      {autoRenewal && (
        <div>
          <FormField
            control={form.control}
            name="renewalNoticeDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Renewal Notice (Days)</FormLabel>
                <FormControl>
                  <InputNumber maxLength={2} placeholder="30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default ContractIncluded
