import { Pencil, QrCode, Upload } from 'lucide-react'

import { Button } from '@/components/common'
import type { Maybe } from '@/types'

type IApartmentPaymentPromptPayButtonProps = {
  onOpenUploadQRCodeModal: () => void
  onOpenQRCodeModal: () => void
  promptpayURL: Maybe<string>
}
const ApartmentPaymentPromptPayButton = ({
  onOpenUploadQRCodeModal,
  onOpenQRCodeModal,
  promptpayURL,
}: IApartmentPaymentPromptPayButtonProps) => {
  if (promptpayURL)
    return (
      <div className="flex items-center gap-2">
        {/* see qr code modal button */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-theme-primary/20 hover:text-theme-primary flex items-center"
          onClick={onOpenQRCodeModal}
        >
          <QrCode className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-theme-primary/20 hover:text-theme-primary flex items-center"
          onClick={onOpenUploadQRCodeModal}
        >
          <Pencil className="size-4" />
        </Button>
      </div>
    )
  return (
    <div>
      <Button
        variant="ghost"
        className="hover:bg-theme-primary/20 hover:text-theme-primary flex items-center"
        onClick={onOpenUploadQRCodeModal}
      >
        <Upload className="size-4" />
        Upload PromptPay QR Code
      </Button>
    </div>
  )
}

export default ApartmentPaymentPromptPayButton
