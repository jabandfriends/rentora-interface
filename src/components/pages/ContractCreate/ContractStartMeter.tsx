import type { UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, InputNumber } from '@/components/common'
import type { MonthlyContractFormData } from '@/types'

type IContractStartMeter = {
  form: UseFormReturn<MonthlyContractFormData>
}
const ContractStartMeter = ({ form }: IContractStartMeter) => {
  return (
    <>
      {/* Step 2: Meter Start Readings */}
      <div className="desktop:grid-cols-2 grid gap-4">
        <FormField
          control={form.control}
          name="waterMeterStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Water Meter Start <span className="text-theme-error">*</span>
              </FormLabel>
              <FormControl>
                <InputNumber maxLength={9} decimal placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="electricMeterStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Electric Meter Start <span className="text-theme-error">*</span>
              </FormLabel>
              <FormControl>
                <InputNumber maxLength={9} decimal placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export default ContractStartMeter
