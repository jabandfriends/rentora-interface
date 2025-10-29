import { Ellipsis, Pencil } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

const MaintenanceAction = ({
  maintenanceId,
  onUpdate,
}: {
  maintenanceId: string
  onUpdate: (maintenanceId: string) => void
  onDelete: (maintenanceId: string) => void
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="flex items-center" size="icon" variant="ghost">
        <Ellipsis size={18} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent sideOffset={10}>
      <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={() => onUpdate(maintenanceId)}>
        <Pencil className="text-theme-warning" size={18} /> Update Maintenance
      </DropdownMenuItem>
      {/* <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={() => onDelete(maintenanceId)}>
        Delete Maintenance
      </DropdownMenuItem> */}
    </DropdownMenuContent>
  </DropdownMenu>
)
export default MaintenanceAction
