import { Ellipsis } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

const TenantActions = ({
  userId,
  onUpdate,
  onPasswordUpdate,
}: {
  userId: string
  onUpdate: (id: string) => void
  onPasswordUpdate: (id: string) => void
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="vanilla">
        <Ellipsis size={18} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" sideOffset={10}>
      <DropdownMenuItem onSelect={() => onUpdate(userId)}>Update Tenant</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => onPasswordUpdate(userId)}>Password Update</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
export default TenantActions
