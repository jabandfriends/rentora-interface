import { Ellipsis, Pencil } from 'lucide-react'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

type IAllRoomsActionProps = {
  unitId: string
}
const AllRoomsAction = ({ unitId }: IAllRoomsActionProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const navigateToUnitUpdate = useCallback(() => {
    if (!apartmentId || !unitId) return
    // navigate(ROUTES.roomUpdate)
  }, [apartmentId, unitId])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center" size="icon" variant="ghost">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10}>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            navigateToUnitUpdate()
          }}
        >
          <Pencil className="text-theme-warning" size={18} /> Edit Room
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AllRoomsAction
