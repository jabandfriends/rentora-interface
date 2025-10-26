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

type ISupplyDeleteAlertProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  handleConfirmDelete: () => void
}

const SupplyDeleteAlert = ({ open, onOpenChange, handleConfirmDelete }: ISupplyDeleteAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Supply</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this supply? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SupplyDeleteAlert
