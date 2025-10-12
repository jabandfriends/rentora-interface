import { Save } from 'lucide-react'
import { useCallback } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { VariantProps } from 'tailwind-variants'

import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputNumber,
} from '@/components/common'
import { Badge, LoadingPage, PageTableSearchEmpty } from '@/components/ui'
import type { MeterReadingFormValues } from '@/types'

type IMeterReadingFormFieldProps = {
  form: UseFormReturn<MeterReadingFormValues>
  fields: MeterReadingFormValues['rooms']
  onSubmit: (data: MeterReadingFormValues) => void
  isLoading: boolean
  isButtonDisabled: boolean
}
const MeterReadingFormField = ({
  form,
  fields,
  onSubmit,
  isLoading,
  isButtonDisabled,
}: IMeterReadingFormFieldProps) => {
  const calculateTotal = useCallback((start?: number, end?: number) => ((end ?? 0) - (start ?? 0)).toFixed(2), [])

  const unitStatusBadgeVariant = useCallback((status: string): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'available':
        return 'default'
      case 'occupied':
        return 'warning'
      default:
        return 'secondary'
    }
  }, [])
  if (isLoading) {
    return <LoadingPage />
  }
  //empty unit
  if (fields.length === 0) {
    return (
      <PageTableSearchEmpty
        message="No units found"
        subMessage="Please add a unit to continue creating meter reading"
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-4">
        {fields.map((fieldItem, index) => (
          <Card key={fieldItem.unitId} className="border-theme-secondary-300 rounded-2xl border p-4 shadow">
            <h4 className="text-theme-secondary font-medium">{fieldItem.unitName}</h4>
            <Badge variant={unitStatusBadgeVariant(fieldItem.unitStatus)} className="capitalize">
              {fieldItem.unitStatus}
            </Badge>
            <div className="desktop:grid-cols-2 grid gap-4">
              {/* Water */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-theme-success h-4 w-1" />
                  <h4>Water Meter</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.waterStart`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Unit</FormLabel>
                          <FormControl>
                            <InputNumber
                              readOnly
                              maxLength={4}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.waterEnd`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Unit</FormLabel>
                          <FormControl>
                            <InputNumber
                              maxLength={4}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <p className="text-body-2 bg-theme-success/10 text-theme-success rounded-lg p-2">
                  Total Water Usage :{' '}
                  <span className="text-theme-success font-medium">
                    {calculateTotal(form.watch(`rooms.${index}.waterStart`), form.watch(`rooms.${index}.waterEnd`))}
                  </span>
                </p>
              </div>

              {/* Electricity */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-theme-primary h-4 w-1" />
                  <h4>Electricity Meter</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.electricStart`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Unit</FormLabel>
                          <FormControl>
                            <InputNumber
                              readOnly
                              maxLength={4}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.electricEnd`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Unit</FormLabel>
                          <FormControl>
                            <InputNumber
                              maxLength={4}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <p className="text-body-2 bg-theme-primary/10 text-theme-primary rounded-lg p-2">
                  Total Electricity Usage :{' '}
                  <span className="text-theme-primary font-medium">
                    {calculateTotal(
                      form.watch(`rooms.${index}.electricStart`),
                      form.watch(`rooms.${index}.electricEnd`),
                    )}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        ))}

        {fields.length > 0 && (
          <div className="desktop:static desktop:px-0 fixed bottom-6 right-0 w-full px-4">
            <Button disabled={isButtonDisabled} block type="submit" className="flex items-center gap-2">
              <Save className="size-4" /> Save Meter Reading
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}

export default MeterReadingFormField
