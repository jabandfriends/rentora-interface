import { Building2, Calendar, Clock } from 'lucide-react'
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
import { LoadingPage, PageTableHeader } from '@/components/ui'
import type { IBuilding, Maybe, MeterReadingFilterFormValues, MeterReadingFormValues } from '@/types'
import { formatDate } from '@/utilities'

import MeterReadingUploadCSV from './MeterReadingUploadCSV'

type IMeterReadingFormFilteredProps = {
  availableBuildings: Maybe<Array<IBuilding>>
  availableMonths: Maybe<Array<number>>
  availableYears: Maybe<Array<number>>
  filterForm: UseFormReturn<MeterReadingFilterFormValues>
  isLoading: boolean
  debouncedYear: Maybe<string>
  debouncedMonth: Maybe<string>
  form: UseFormReturn<MeterReadingFormValues>
}
const MeterReadingFormFiltered = ({
  availableBuildings,
  availableMonths,
  availableYears,
  filterForm,
  isLoading,
  debouncedYear,
  form,
}: IMeterReadingFormFilteredProps) => {
  useEffect(() => {
    if (filterForm.watch('month') && availableMonths && !availableMonths.includes(Number(filterForm.watch('month')))) {
      filterForm.setValue('month', '') // Clear month if it’s not valid for new building
    }
  }, [filterForm, availableMonths]) // run when building or month list changes

  if (isLoading) {
    return <LoadingPage />
  }

  const [year, buildingName, month]: [Maybe<string>, Maybe<string>, Maybe<string>] = filterForm.watch([
    'year',
    'buildingName',
    'month',
  ])

  return (
    <Card className="rounded-2xl p-6">
      {/* header */}
      <PageTableHeader
        actionButton={<MeterReadingUploadCSV form={form} year={year} buildingName={buildingName} month={month} />}
        title="Filter Meter Reading"
        description="Filter meter reading by date and building"
      />
      <div className="space-y-6">
        {/* Filter Form */}
        <Form {...filterForm}>
          <div className="desktop:grid-cols-3 grid grid-cols-1 gap-4">
            {/* Year Field */}
            <FormField
              control={filterForm.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base">
                    <Calendar className="text-theme-primary size-4" />
                    Reading Year
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11 w-full text-base">
                        <SelectValue placeholder="Choose a year" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableYears?.map((year: number) => (
                          <SelectItem key={year} value={year.toString()} className="text-base">
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

            {/* Building Field */}
            <FormField
              control={filterForm.control}
              name="buildingName"
              render={({ field }) => (
                <FormItem className={!debouncedYear ? 'pointer-events-none opacity-50' : ''}>
                  <FormLabel className="flex items-center gap-2 text-base">
                    <Building2 className="text-theme-primary size-4" />
                    Building
                    {!debouncedYear && (
                      <span className="text-body-2 text-theme-secondary font-normal">(Select year first)</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!debouncedYear}>
                      <SelectTrigger className="h-11 w-full text-base">
                        <SelectValue placeholder="Choose a building" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBuildings?.map((building: IBuilding) => (
                          <SelectItem key={building.id} value={building.name} className="text-base">
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

            {/* Month Field */}
            <FormField
              control={filterForm.control}
              name="month"
              render={({ field }) => (
                <FormItem className={!buildingName ? 'pointer-events-none opacity-50' : ''}>
                  <FormLabel className="flex items-center gap-2 text-base">
                    <Clock className="text-theme-primary size-4" />
                    Reading Month
                    {!buildingName && (
                      <span className="text-body-2 text-theme-secondary font-normal">(Select building first)</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!buildingName}>
                      <SelectTrigger className="h-11 w-full text-base">
                        <SelectValue placeholder="Choose a month" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMonths?.map((month: number) => (
                          <SelectItem key={month} value={month.toString()} className="text-base">
                            {formatDate(new Date(2024, month - 1, 1), 'MMMM')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Helper Text */}
          <HelperText debouncedYear={debouncedYear} buildingName={buildingName} filterForm={filterForm} />
        </Form>
      </div>
    </Card>
  )
}

const HelperText = ({
  debouncedYear,
  buildingName,
  filterForm,
}: {
  debouncedYear: Maybe<string>
  buildingName: Maybe<string>
  filterForm: UseFormReturn<MeterReadingFilterFormValues>
}) => {
  if (!debouncedYear) {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <span className="text-theme-primary flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">ℹ</span>
        Start by selecting the year to view available buildings
      </p>
    )
  }
  if (debouncedYear && !buildingName) {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <span className="text-theme-primary flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">ℹ</span>
        Select a building to view available months
      </p>
    )
  }
  if (buildingName && !filterForm.watch('month')) {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <span className="text-theme-primary flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">ℹ</span>
        Select a month to view meter readings
      </p>
    )
  }
}

export default MeterReadingFormFiltered
