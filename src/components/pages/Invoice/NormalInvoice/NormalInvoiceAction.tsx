import { Ellipsis } from 'lucide-react'
import { useCallback } from 'react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

const InvoiceAction = ({
  onUpdateModalOpen,
  id,
  onSelectedId,
}: {
  onUpdateModalOpen: () => void
  id: string
  onSelectedId: (id: string) => void
}) => {
  const handleOpenUpdateModal = useCallback(() => {
    if (!id) return
    onSelectedId(id)
    onUpdateModalOpen()
  }, [id, onSelectedId, onUpdateModalOpen])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center" variant="ghost" size="icon">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10}>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={handleOpenUpdateModal}>
          Update Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default InvoiceAction
