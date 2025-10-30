import type { UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, InputNumber } from '@/components/common'
import type { MonthlyContractFormData } from '@/types'

import ContractNavigation from './ContractNavigation'

type IContractStartMeter = {
  form: UseFormReturn<MonthlyContractFormData>
  currentStep: number
  handleStepChange: (nextStep: number) => void
  onSubmit: (data: MonthlyContractFormData) => void
}
const ContractStartMeter = ({ form, currentStep, handleStepChange, onSubmit }: IContractStartMeter) => {
  return (
    <div className="space-y-4">
      {/* Step 2: Meter Start Readings */}
      <div className="desktop:grid-cols-2 grid gap-4">
        <div>
          <FormField
            control={form.control}
            name="waterMeterStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Water Meter Start <span className="text-theme-error">*</span>
                </FormLabel>
                <FormControl>
                  <InputNumber maxLength={8} decimal placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="electricMeterStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Electric Meter Start <span className="text-theme-error">*</span>
                </FormLabel>
                <FormControl>
                  <InputNumber maxLength={8} decimal placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <ContractNavigation
        currentStep={currentStep}
        setCurrentStep={handleStepChange}
        onSubmit={form.handleSubmit(onSubmit)}
      />
    </div>
  )
}

export default ContractStartMeter
