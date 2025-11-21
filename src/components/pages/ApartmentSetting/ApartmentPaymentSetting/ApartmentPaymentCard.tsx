import type { IApartmentPayment } from '@/types'

import ApartmentPaymentPromptPayButton from './ApartmentPaymentPromptPayButton'

type IApartmentPaymentCardProps = {
  payment: IApartmentPayment
  onOpenUploadQRCodeModal: () => void
  onOpenQRCodeModal: () => void
}
const ApartmentPaymentCard = ({ payment, onOpenUploadQRCodeModal, onOpenQRCodeModal }: IApartmentPaymentCardProps) => {
  return (
    <div className="border-theme-secondary-300 hover:border-theme-primary-300 hover:bg-theme-primary-100 desktop:flex-row group flex flex-col items-center justify-between gap-1 rounded-xl border px-4 py-4 duration-200">
      <div>
        <h4>Bank : {payment.bankName}</h4>
        <p className="text-body-2 text-theme-secondary">Account Number : {payment.bankAccountNumber}</p>
        <p className="text-body-2 text-theme-secondary">Account Holder : {payment.accountHolderName}</p>
      </div>
      <ApartmentPaymentPromptPayButton
        onOpenQRCodeModal={onOpenQRCodeModal}
        promptpayURL={payment.promptpayURL}
        onOpenUploadQRCodeModal={onOpenUploadQRCodeModal}
      />
    </div>
  )
}

export default ApartmentPaymentCard
