import { Ellipsis } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

const InvoiceAction = ({
  id,
  onUpdate,
  onDelete,
}: {
  id: string
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
      <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={() => onUpdate(id)}>
        Update Invoice
      </DropdownMenuItem>
      <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={() => onDelete(id)}>
        Delete Invoice
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
export default InvoiceAction
