import type { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputNumber,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { Separator } from '@/components/ui'
import { ADHOC_INVOICE_CATEGORY, ADHOC_INVOICE_PAYMENT_STATUS } from '@/enum'
import type { ADHOC_INVOICE_FORM_SCHEMA_TYPE } from '@/types'

type IAdhocBilling = {
  form: UseFormReturn<ADHOC_INVOICE_FORM_SCHEMA_TYPE>
}

const AdhocBilling = ({ form }: IAdhocBilling) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Billing Details</h4>
        <p className="text-body-2 text-theme-secondary">Item and amount details</p>
      </div>
      <Separator />
      <div className="desktop:grid-cols-2 grid gap-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(ADHOC_INVOICE_CATEGORY).map(([key, value]) => (
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
        <FormField
          control={form.control}
          name="finalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Amount <span className="text-theme-error">*</span>
              </FormLabel>
              <FormControl>
                <InputNumber maxLength={8} decimal placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(ADHOC_INVOICE_PAYMENT_STATUS).map(([key, value]) => (
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
    </div>
  )
}

export default AdhocBilling
