import { Ellipsis } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

const MaintenanceAction = ({
    maintenanceId,
    onUpdate,
    onDelete,
}: {
    maintenanceId: string
    onUpdate: (maintenanceId: string) => void
    onDelete: (maintenanceId: string) => void
}) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="vanilla">
                <Ellipsis size={18} />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={10}>
            <DropdownMenuItem onSelect={() => onUpdate(maintenanceId)}>Update Maintenance</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onDelete(maintenanceId)}>Delete Maintenance</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
export default MaintenanceAction
