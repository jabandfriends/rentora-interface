import { Ellipsis, Pencil, Trash } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

type ISupplyActionProps = {
  onUpdate: () => void
  onDelete: () => void
}
const SupplyAction = ({ onUpdate, onDelete }: ISupplyActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="vanilla">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10}>
        <DropdownMenuItem onClick={onUpdate}>
          <Pencil className="text-theme-warning" size={18} /> Edit Supply
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="text-theme-error" size={18} /> Remove Supply
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SupplyAction
