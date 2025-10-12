import { Calendar } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/components/common'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/feature'
import {
  useRentoraApiBuildingListNoPaginate,
  useRentoraApiUnitUtilityAvailableMonth,
  useRentoraApiUnitUtilityAvailableYear,
} from '@/hooks'
import { getMonthNameByNumber } from '@/utilities'

type IMonthlyInvoiceCreateFilter = {
  debouncedYear: number
  debouncedMonth: number
  debouncedBuildingName: string
  onBuildingChange: (buildingName: string) => void
  onMonthChange: (month: number) => void
  onFilterReset: () => void
  onYearChange: (year: number) => void
}
const MonthlyInvoiceCreateFilter = ({
  debouncedYear,
  debouncedMonth,
  debouncedBuildingName,
  onBuildingChange,
  onMonthChange,
  onFilterReset,
  onYearChange,
}: IMonthlyInvoiceCreateFilter) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  //available years
  const { data: availableYears, isLoading: isLoadingYears } = useRentoraApiUnitUtilityAvailableYear({
    apartmentId: apartmentId,
  })

  //available months
  const { data: availableMonths, isLoading: isLoadingMonths } = useRentoraApiUnitUtilityAvailableMonth({
    apartmentId: apartmentId,
    params: {
      year: debouncedYear,
      buildingName: debouncedBuildingName,
    },
  })

  //available buildings
  const { data: availableBuildings, isLoading: isLoadingBuildings } = useRentoraApiBuildingListNoPaginate({
    apartmentId: apartmentId,
  })

  const isLoading: boolean = useMemo(
    () => isLoadingYears || isLoadingMonths || isLoadingBuildings,
    [isLoadingYears, isLoadingMonths, isLoadingBuildings],
  )
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button block variant="outline" className="flex items-center">
          <Calendar className="size-5" />
          Set Billing Period
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md rounded-lg p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle>Select Billing Period</DialogTitle>
          <DialogDescription className="text-theme-secondary">
            Choose the reading month, year, and payment due day for billing.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-theme-secondary font-medium">Reading Year</Label>
            <Select value={debouncedYear?.toString()} onValueChange={(value) => onYearChange(Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears?.years?.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-theme-secondary font-medium">Building Name</Label>
            <Select value={debouncedBuildingName} onValueChange={onBuildingChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a building" />
              </SelectTrigger>
              <SelectContent>
                {availableBuildings?.map((building) => (
                  <SelectItem key={building.id} value={building.name}>
                    {building.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {debouncedYear && (
            <div className="space-y-2">
              <Label className="text-theme-secondary font-medium">Reading Month</Label>
              <Select value={debouncedMonth?.toString()} onValueChange={(value) => onMonthChange(Number(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  {availableMonths?.months?.map((month, index) => (
                    <SelectItem key={index} value={month.toString()}>
                      {getMonthNameByNumber(month)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="border-theme-primary bg-theme-primary/10 rounded-md border p-4">
            <p className="text-theme-primary">
              <span className="font-medium">Selected Period :</span>
              {debouncedMonth && debouncedYear
                ? `${getMonthNameByNumber(debouncedMonth)}, ${debouncedYear}`
                : ' Not selected'}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onFilterReset} variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={isLoading}>{isLoading ? <Spinner /> : 'Submit'}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MonthlyInvoiceCreateFilter
