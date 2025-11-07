import { type ChangeEvent, useMemo } from 'react'
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
  SearchBar,
} from '@/components/feature'
import { EmptyPage } from '@/components/ui'
import { PaymentStatus, VerifiedStatus } from '@/enum/payment'
import { useRentoraApiBuildingListNoPaginate, useRentoraApiReportReadingDateUtility } from '@/hooks'
import type { IReadingUnitUtility } from '@/types'

type IPaymentSearchProps = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onPaymentStatusChange?: (value: PaymentStatus) => void
  onVerifiedStatusChange?: (value: VerifiedStatus) => void
  onGenMonthChange?: (value: string) => void
  onBuildingNameChange?: (value: string) => void
}

const PaymentSearch = ({
  onGenMonthChange,
  onSearchChange,
  onPaymentStatusChange,
  onVerifiedStatusChange,
  onBuildingNameChange,
}: IPaymentSearchProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: buildingList, isLoading } = useRentoraApiBuildingListNoPaginate({ apartmentId })

  //reading date
  const { data: readingDateUtility, isLoading: isLoadingReadingDateUtility } = useRentoraApiReportReadingDateUtility({
    apartmentId,
  })

  const isDataLoading: boolean = useMemo(
    () => isLoading || isLoadingReadingDateUtility,
    [isLoading, isLoadingReadingDateUtility],
  )
  if (isDataLoading) {
    return <Spinner />
  }
  if (!buildingList) {
    return <EmptyPage title="No building found" description="Please add a building to continue" />
  }

  if (!readingDateUtility) {
    return <EmptyPage title="No reading date found" description="Please add a reading date to continue" />
  }

  return (
    <div className="desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <Select onValueChange={onGenMonthChange}>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Meter Reading Month" />
          </SelectTrigger>
          <SelectContent>
            {readingDateUtility?.map((date: IReadingUnitUtility) => (
              <SelectItem className="capitalize" key={date.readingDate} value={date.readingDate}>
                {date.readingDate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Payments</DialogTitle>
                <DialogDescription>
                  Filter the payments by building, payment status, verified status, and meter reading month.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Building Dropdown */}
                <div className="space-y-1">
                  <Label>Building</Label>
                  <Select onValueChange={onBuildingNameChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Building" />
                    </SelectTrigger>
                    <SelectContent>
                      {buildingList.map((building) => (
                        <SelectItem className="capitalize" key={building.id} value={building.name}>
                          {building.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Status Dropdown */}
                <div className="space-y-1">
                  <Label>Payment Status</Label>
                  <Select onValueChange={onPaymentStatusChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(PaymentStatus).map((status) => (
                        <SelectItem className="capitalize" key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>Verified Status</Label>
                  <Select onValueChange={onVerifiedStatusChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Verified Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(VerifiedStatus).map((status) => (
                        <SelectItem className="capitalize" key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="desktop:w-auto w-full" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default PaymentSearch
