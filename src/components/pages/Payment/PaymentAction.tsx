import { Ellipsis, Receipt } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

type IPaymentActionProps = {
  onOpenPaymentUpdateModal: () => void
}
const PaymentAction = ({ onOpenPaymentUpdateModal }: IPaymentActionProps) => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PaymentAction
