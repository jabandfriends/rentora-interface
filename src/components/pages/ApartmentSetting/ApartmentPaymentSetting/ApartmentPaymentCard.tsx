import { QrCode, Upload } from 'lucide-react'

import { Button } from '@/components/common'
import type { IApartmentPayment } from '@/types'

type IApartmentPaymentCardProps = {
  payment: IApartmentPayment
}
const ApartmentPaymentCard = ({ payment }: IApartmentPaymentCardProps) => {
  return (
    <div className="border-theme-secondary-300 hover:border-theme-primary-300 hover:bg-theme-primary-100 group flex items-center justify-between gap-1 rounded-xl border px-4 py-4 duration-200">
      <div>
        <h4>Bank : {payment.bankName}</h4>
        <p className="text-body-2 text-theme-secondary">Account Number : {payment.bankAccountNumber}</p>
        <p className="text-body-2 text-theme-secondary">Account Holder : {payment.accountHolderName}</p>
      </div>
      <div>
        {/* see qr code modal button */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-theme-primary/20 hover:text-theme-primary flex items-center"
        >
          <QrCode className="size-4" />
        </Button>

        <Button variant="ghost" className="hover:bg-theme-primary/20 hover:text-theme-primary flex items-center">
          <Upload className="size-4" />
          Upload PromptPay QR Code
        </Button>
      </div>
    </div>
  )
}

export default ApartmentPaymentCard
