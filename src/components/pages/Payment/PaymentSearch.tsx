import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { PAYMENT_STATUS_ENUM, VERIFIED_STATUS_ENUM } from '@/constants/payment'

// type PaymentSearchProps = {
//   onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   onStatusChange?: (value: string) => void
//   onVerifiedChange?: (value: string) => void
// }

const PaymentSearch = () => {
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-2 rounded-2xl px-4 py-4">
      {/* Search */}
      {/* <SearchBar onChange={onSearchChange} placeholder="Search by payment number" /> */}

      <div className="flex gap-2">
        {/* Payment Status Dropdown */}
        <Select>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(PAYMENT_STATUS_ENUM).map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Verified Status Dropdown */}
        <Select>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Verified Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(VERIFIED_STATUS_ENUM).map((verify) => (
              <SelectItem key={verify} value={verify} className="capitalize">
                {verify}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default PaymentSearch
