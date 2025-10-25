import { Button } from '@/components/common'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/feature'

type ISupplyCreateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SupplyCreateModal = ({ open, onOpenChange }: ISupplyCreateModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Supply</DialogTitle>
          <DialogDescription>Fill in the form below to create a new supply.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Create Supply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SupplyCreateModal
