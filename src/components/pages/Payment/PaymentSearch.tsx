import type { ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { PaymentStatus, VerifiedStatus } from '@/enum/payment'
import { useRentoraApiBuildingListNoPaginate } from '@/hooks'

type IPaymentSearchProps = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onPaymentStatusChange?: (value: PaymentStatus) => void
  onVerifiedStatusChange?: (value: VerifiedStatus) => void
}

const PaymentSearch = ({ onSearchChange, onPaymentStatusChange, onVerifiedStatusChange }: IPaymentSearchProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: buildingList, isLoading } = useRentoraApiBuildingListNoPaginate({ apartmentId })
  if (isLoading) {
    return <Spinner />
  }
  if (!buildingList) {
    return <Spinner />
  }
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl px-4 py-4">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Status Dropdown */}
          {PaymentStatus && (
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
          )}

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
    </div>
  )
}

export default PaymentSearch
