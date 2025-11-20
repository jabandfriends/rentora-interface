import { useCallback } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { VariantProps } from 'tailwind-variants'

import { Card, FormControl, FormField, FormItem, FormMessage, InputNumber } from '@/components/common'
import { Badge, PageTableHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import type { MeterReadingFormValues } from '@/types'

type IMeterReadingFormFieldTableProps = {
  form: UseFormReturn<MeterReadingFormValues>
  fields: MeterReadingFormValues['rooms']
}
const MeterReadingFormFieldTable = ({ fields, form }: IMeterReadingFormFieldTableProps) => {
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
  return (
    <Card className="rounded-2xl pb-10">
      <PageTableHeader title="Meter Reading" description="Meter reading for the selected units" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Water Start</TableHead>
            <TableHead>Water End</TableHead>
            <TableHead>Water Total</TableHead>
            <TableHead>Electricity Start</TableHead>
            <TableHead>Electricity End</TableHead>
            <TableHead>Electricity Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => {
            const waterTotal = calculateTotal(
              form.watch(`rooms.${index}.waterStart`),
              form.watch(`rooms.${index}.waterEnd`),
            )
            const electricityTotal = calculateTotal(
              form.watch(`rooms.${index}.electricStart`),
              form.watch(`rooms.${index}.electricEnd`),
            )
            return (
              <TableRow key={field.unitId}>
                <TableCell>{field.unitName}</TableCell>
                <TableCell className="capitalize">
                  <Badge variant={unitStatusBadgeVariant(field.unitStatus)} className="capitalize">
                    {field.unitStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`rooms.${index}.waterStart`}
                    render={({ field }) => (
                      <FormItem>
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
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`rooms.${index}.waterEnd`}
                    render={({ field }) => (
                      <FormItem>
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
                </TableCell>
                <TableCell>{waterTotal} Unit</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`rooms.${index}.electricStart`}
                    render={({ field }) => (
                      <FormItem>
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
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`rooms.${index}.electricEnd`}
                    render={({ field }) => (
                      <FormItem>
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
                </TableCell>
                <TableCell>{electricityTotal} Unit</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}

export default MeterReadingFormFieldTable
