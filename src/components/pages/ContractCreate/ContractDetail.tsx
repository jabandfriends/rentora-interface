import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputNumber,
  Popover,
} from '@/components/common'
import { Calendar } from '@/components/ui'
import { endMonth, startMonth } from '@/constants'
import type { MonthlyContractFormData } from '@/types'
import { cn } from '@/utilities'

type IContractDetail = {
  form: UseFormReturn<MonthlyContractFormData>
}

const ContractDetail = ({ form }: IContractDetail) => {
  const { trigger, watch } = form
  const [startDate, endDate, rentalType]: [Date, Date, string] = watch(['startDate', 'endDate', 'rentalType'])
  useEffect(() => {
    if (startDate || endDate || rentalType) {
      trigger(['startDate', 'endDate', 'rentalType'])
    }
  }, [startDate, endDate, trigger, rentalType])
  return (
    <div className="desktop:grid-cols-2 grid gap-4">
      <div>
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Start Date <span className="text-theme-error">*</span>
              </FormLabel>
              <Popover
                trigger={
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'flex w-full justify-between pl-3 text-left font-normal',
                        !field.value && 'text-theme-secondary',
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                }
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  captionLayout="dropdown"
                  startMonth={startMonth}
                  endMonth={endMonth}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0) // set to midnight
                    const checkDate = new Date(date)
                    checkDate.setHours(0, 0, 0, 0)
                    return checkDate < today
                  }}
                  className="pointer-events-auto"
                />
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                End Date <span className="text-theme-error">*</span>
              </FormLabel>
              <Popover
                trigger={
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'flex w-full justify-between pl-3 text-left font-normal',
                        !field.value && 'text-theme-secondary',
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="size-4 opacity-50" />
                    </Button>
                  </FormControl>
                }
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  captionLayout="dropdown"
                  startMonth={startMonth}
                  endMonth={endMonth}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0) // set to midnight
                    const checkDate = new Date(date)
                    checkDate.setHours(0, 0, 0, 0)
                    return checkDate < today
                  }}
                  className="pointer-events-auto"
                />
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="rentalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Rental Price <span className="text-theme-error">*</span>
              </FormLabel>
              <FormControl>
                <InputNumber maxLength={8} decimal placeholder="12000.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="depositAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Deposit Amount <span className="text-theme-error">*</span>
              </FormLabel>
              <FormControl>
                <InputNumber maxLength={8} decimal placeholder="24000.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="advancePaymentMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Advance Payment (Months) <span className="text-theme-error">*</span>
              </FormLabel>
              <FormControl>
                <InputNumber maxLength={2} placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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

      <div>
        <FormField
          control={form.control}
          name="documentUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document URL</FormLabel>
              <FormControl>
                <Input maxLength={100} placeholder="https://example.com/contract.pdf" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default ContractDetail
