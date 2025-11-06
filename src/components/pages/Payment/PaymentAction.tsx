import { Ellipsis, Eye, Receipt } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'
import type { IPayment } from '@/types'

type IPaymentActionProps = {
  onOpenPaymentUpdateModal: () => void
  onOpenPaymentReceiptModal: () => void

  payment: IPayment
}
const PaymentAction = ({ onOpenPaymentUpdateModal, onOpenPaymentReceiptModal, payment }: IPaymentActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center" size="icon" variant="ghost">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10}>
        <DropdownMenuItem onClick={onOpenPaymentUpdateModal}>
          <Receipt className="text-theme-primary" size={18} /> Upload Payment Receipt
        </DropdownMenuItem>
        {payment.receiptUrl && (
          <DropdownMenuItem onClick={onOpenPaymentReceiptModal}>
            <Eye className="text-theme-primary" size={18} /> View Payment Receipt
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PaymentAction
