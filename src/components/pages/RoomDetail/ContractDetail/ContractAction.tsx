import { Ellipsis, FileText, Pencil, Trash2 } from 'lucide-react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'

type IContractAction = {
  handleOpenDeleteModal: () => void
  handleDownloadContract: () => void
  handleOpenContractUpdateModal: () => void
}
const ContractAction = ({
  handleOpenDeleteModal,
  handleDownloadContract,
  handleOpenContractUpdateModal,
}: IContractAction) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="flex items-center">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Contract</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleDownloadContract}>
          <FileText className="text-theme-primary" /> Download Contract (For Signature)
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleOpenContractUpdateModal}>
          <Pencil className="text-theme-warning" /> Edit contract
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleOpenDeleteModal}>
          <Trash2 className="text-theme-error" /> Terminate contract
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ContractAction
