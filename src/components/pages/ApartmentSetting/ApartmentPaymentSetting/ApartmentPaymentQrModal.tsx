import { Button, Image } from '@/components/common'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/feature'

type IApartmentPaymentQrModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  qrCode: string
}
const ApartmentPaymentQrModal = ({ isOpen, onOpenChange, qrCode }: IApartmentPaymentQrModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>PromptPay QR Code</DialogTitle>
          <DialogDescription>Your PromptPay QR code is displayed here.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Image src={qrCode} alt="PromptPay QR Code" width={300} height={300} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApartmentPaymentQrModal
