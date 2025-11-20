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

type IPaymentReceiptModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  receiptUrl: string
}

const PaymentReceiptModal = ({ open, onOpenChange, receiptUrl }: IPaymentReceiptModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Receipt</DialogTitle>
          <DialogDescription>Your payment receipt is displayed here.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Image src={receiptUrl} alt="Payment Receipt" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="desktop:w-auto w-full" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentReceiptModal
