import type { UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@/components/common'
import { Separator } from '@/components/ui'
import type { MonthlyContractFormData } from '@/types'

type IContractCondition = {
  form: UseFormReturn<MonthlyContractFormData>
}
const ContractCondition = ({ form }: IContractCondition) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Contract Conditions</h4>
        <p className="text-body-2 text-theme-secondary">Fill in the form below to create a new contract</p>
      </div>
      <Separator />
      <FormField
        control={form.control}
        name="termsAndConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Terms and Conditions</FormLabel>
            <FormControl>
              <Textarea
                maxLength={120}
                placeholder="Enter terms and conditions..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="specialConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Conditions</FormLabel>
            <FormControl>
              <Textarea
                maxLength={120}
                placeholder="Enter special conditions..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ContractCondition
