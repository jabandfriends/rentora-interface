import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { PaymentStatus, VerifiedStatus } from '@/enum'

type ITenantPaymentFilterProps = {
  onPaymentStatusChange: (value: PaymentStatus) => void
  onVerifiedStatusChange: (value: VerifiedStatus) => void
}
const TenantPaymentFilter = ({ onPaymentStatusChange, onVerifiedStatusChange }: ITenantPaymentFilterProps) => {
  return (
    <div>
      {/* payment */}
      <Select onValueChange={onPaymentStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a payment status" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(PaymentStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* verified status */}
      <Select onValueChange={onVerifiedStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a verified status" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(VerifiedStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TenantPaymentFilter
