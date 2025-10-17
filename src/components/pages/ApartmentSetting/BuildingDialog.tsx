import { Button, Input, Label } from '@/components/common'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/feature'

type IBuildingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const BuildingDialog = ({ open, onOpenChange }: IBuildingDialogProps) => {
  const handleSave = () => {
    console.log('Save building')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Building</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Building Name</Label>
            <Input id="name" placeholder="e.g., Sunrise Tower" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BuildingDialog
