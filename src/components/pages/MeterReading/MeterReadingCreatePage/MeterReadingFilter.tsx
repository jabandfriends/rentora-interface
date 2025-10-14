import type { UseFormReturn } from 'react-hook-form'

import {
  Card,
  Form,
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
} from '@/components/common'
import type { IBuilding } from '@/types'

type IMeterReadingFilterProps = {
  availableBuildings: Array<IBuilding>
  availableMonths: { months: Array<number> }
  availableYears: { years: Array<number> }
  filterForm: UseFormReturn
}
const MeterReadingFilter = ({
  availableBuildings,
  availableMonths,
  availableYears,
  filterForm,
}: IMeterReadingFilterProps) => {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex flex-wrap gap-4">
        <Form {...filterForm}>
          <FormField
            control={filterForm.control}
            name="buildingName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select building" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBuildings?.map((building: IBuilding) => (
                        <SelectItem key={building.id} value={building.name}>
                          {building.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={filterForm.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reading Month</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMonths?.months.map((month: number) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={filterForm.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reading Year</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableYears?.years.map((year: number) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </Card>
  )
}

export default MeterReadingFilter
