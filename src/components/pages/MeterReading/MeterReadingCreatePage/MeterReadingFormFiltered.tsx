import { useEffect } from 'react'
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
import { LoadingPage } from '@/components/ui'
import type { IBuilding, Maybe, MeterReadingFilterFormValues } from '@/types'

type IMeterReadingFormFilteredProps = {
  availableBuildings: Maybe<Array<IBuilding>>
  availableMonths: Maybe<Array<number>>
  availableYears: Maybe<Array<number>>
  filterForm: UseFormReturn<MeterReadingFilterFormValues>
  isLoading: boolean
  debouncedYear: Maybe<string>
  debouncedMonth: Maybe<string>
}
const MeterReadingFormFiltered = ({
  availableBuildings,
  availableMonths,
  availableYears,
  filterForm,
  isLoading,
  debouncedYear,
}: IMeterReadingFormFilteredProps) => {
  // 🧠 When building changes, validate if current month still exists
  useEffect(() => {
    if (filterForm.watch('month') && availableMonths && !availableMonths.includes(Number(filterForm.watch('month')))) {
      filterForm.setValue('month', '') // Clear month if it’s not valid for new building
    }
  }, [filterForm, availableMonths]) // run when building or month list changes
  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex flex-wrap gap-4">
        <Form {...filterForm}>
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
                      {availableYears?.map((year: number) => (
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
          {debouncedYear && (
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
          )}
          {debouncedYear && filterForm.watch('buildingName') && (
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
                        {availableMonths?.map((month: number) => (
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
          )}
        </Form>
      </div>
    </Card>
  )
}

export default MeterReadingFormFiltered
