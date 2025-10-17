import { Calendar, FileWarning, Info } from 'lucide-react'
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
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
import { PageTableEmpty } from '@/components/ui'
import { useRentoraApiBuildingListNoPaginate, useRentoraApiReportReadingDateUtility } from '@/hooks'
import type { IReadingUnitUtility } from '@/types'

type IMonthlyInvoiceCreateFilter = {
  debouncedReadingDate: string
  debouncedBuildingName: string
  onBuildingChange: (buildingName: string) => void
  onReadingDateChange: (readingDate: string) => void
  onPaymentDueDateChange: (paymentDueDate: string) => void
  paymentDueDate: number
  onFilterReset: () => void
}
const MonthlyInvoiceCreateFilter = ({
  debouncedReadingDate,
  debouncedBuildingName,
  onBuildingChange,
  onReadingDateChange,
  paymentDueDate,
  onPaymentDueDateChange,
  onFilterReset,
}: IMonthlyInvoiceCreateFilter) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: readingDateUtility, isLoading: isLoadingReadingDateUtility } = useRentoraApiReportReadingDateUtility({
    apartmentId,
  })

  //available buildings
  const { data: availableBuildings, isLoading: isLoadingBuildings } = useRentoraApiBuildingListNoPaginate({
    apartmentId: apartmentId,
  })

  const isLoading: boolean = useMemo(
    () => isLoadingBuildings || isLoadingReadingDateUtility,
    [isLoadingBuildings, isLoadingReadingDateUtility],
  )

  if (isLoadingReadingDateUtility)
    return (
      <PageTableEmpty
        message="Loading meter reading..."
        description="Please wait while we load the meter reading."
        icon={<Spinner />}
      />
    )

  if (!readingDateUtility || (!availableBuildings && readingDateUtility.length === 0))
    return (
      <PageTableEmpty
        message="No meter reading found"
        description="Please add meter reading to generate invoice"
        icon={<FileWarning className="text-theme-error size-10" />}
      />
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
            <Label className="text-theme-secondary font-medium">Reading Date</Label>
            <Select value={debouncedReadingDate} onValueChange={(value) => onReadingDateChange(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                {readingDateUtility?.map((item: IReadingUnitUtility) => (
                  <SelectItem key={item.readingDate} value={item.readingDate}>
                    {item.readingDate}
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
          <div className="space-y-2">
            <Label className="text-theme-secondary flex items-center font-medium">
              <span>Payment Due Date</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="size-5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Payment due date is the day of the month when the payment is due.</p>
                </TooltipContent>
              </Tooltip>
            </Label>

            <Select value={paymentDueDate?.toString()} onValueChange={onPaymentDueDateChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment due date" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onFilterReset} variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={isLoading}>{isLoading ? <Spinner /> : 'Save'}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MonthlyInvoiceCreateFilter
