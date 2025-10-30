import { useCallback } from 'react'
import toast from 'react-hot-toast'

import { Spinner } from '@/components/common'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/feature'
import { useRentoraApiDeleteSupply } from '@/hooks'
import type { ISupply, Maybe } from '@/types'
import { getErrorMessage } from '@/utilities'

type ISupplyDeleteAlertProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  supply: Maybe<ISupply>
}

const SupplyDeleteAlert = ({ open, onOpenChange, supply }: ISupplyDeleteAlertProps) => {
  const { mutateAsync: deleteSupply, isPending: isDeleteSupplyPending } = useRentoraApiDeleteSupply()

  const handleConfirmDelete = useCallback(async () => {
    if (!supply) return
    try {
      await deleteSupply({ supplyId: supply.supplyId })
      toast.success('Supply removed successfully')
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [deleteSupply, supply, onOpenChange])
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Supply</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this supply? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleteSupplyPending}>
            {isDeleteSupplyPending ? <Spinner /> : 'Remove Supply'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SupplyDeleteAlert
