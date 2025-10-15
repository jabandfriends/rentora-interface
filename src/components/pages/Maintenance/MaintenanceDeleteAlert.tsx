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

type IMaintenanceDeleteAlertProps = {
  isAlertOpen: boolean
  setIsAlertOpen: (open: boolean) => void
  handleConfirmDelete: () => void
}
const MaintenanceDeleteAlert = ({ isAlertOpen, setIsAlertOpen, handleConfirmDelete }: IMaintenanceDeleteAlertProps) => {
  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this maintenance item?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MaintenanceDeleteAlert
