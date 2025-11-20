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
  Textarea,
} from '@/components/common'
import { Separator } from '@/components/ui'
import { ADHOC_INVOICE_PRIORITY } from '@/enum'
import type { ADHOC_INVOICE_FORM_SCHEMA_TYPE } from '@/types'

type IAdhocAdditional = {
  form: UseFormReturn<ADHOC_INVOICE_FORM_SCHEMA_TYPE>
}

const AdhocAdditional = ({ form }: IAdhocAdditional) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Additional Information</h4>
        <p className="text-body-2 text-theme-secondary">Additional details and notes</p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="desktop:grid-cols-2 grid gap-4">
          <FormField
            control={form.control}
            name="includeInMonthly"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Include in Monthly Invoice</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val === 'yes')}
                  value={typeof field.value === 'boolean' ? (field.value ? 'yes' : 'no') : undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full capitalize">
                      <SelectValue placeholder="Select include in monthly" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
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
                    {Object.entries(ADHOC_INVOICE_PRIORITY).map(([key, value]) => (
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
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional notes regarding the invoice" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default AdhocAdditional
