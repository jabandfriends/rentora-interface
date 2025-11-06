import { Ellipsis, FileText, Pencil, Trash2 } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'

type IContractAction = {
  handleOpenDeleteModal: () => void
  handleDownloadContract: () => void
}
const ContractAction = ({ handleOpenDeleteModal, handleDownloadContract }: IContractAction) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="flex items-center">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDownloadContract}>
          <FileText className="text-theme-primary" /> Download Contract (For Signature)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenDeleteModal}>
          <Trash2 className="text-theme-error" /> Terminate contract
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil className="text-theme-warning" /> Update contract
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ContractAction
