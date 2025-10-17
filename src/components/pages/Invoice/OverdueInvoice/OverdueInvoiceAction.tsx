import { Ellipsis } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

const OverdueInvoiceAction = ({
  userId,
  onUpdate,
  onDelete,
}: {
  userId: string
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="vanilla">
        <Ellipsis size={18} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" sideOffset={10}>
      <DropdownMenuItem onSelect={() => onUpdate(userId)}>Update Invoice</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => onDelete(userId)}>Delete Invoice</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default OverdueInvoiceAction
