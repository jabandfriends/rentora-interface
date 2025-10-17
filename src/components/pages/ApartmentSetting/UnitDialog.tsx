import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/feature'
import type { IUnit, Maybe } from '@/types'

interface UnitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  unit: Maybe<IUnit>
  onSave: (unit: Omit<IUnit, 'id'>) => void
}

const UnitDialog = ({ open, onOpenChange, unit }: UnitDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{unit ? 'Edit Unit' : 'Add New Unit'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="unit-name">Unit Name</Label>
            <Input id="unit-name" placeholder="e.g., Unit 101" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit-type">Unit Type</Label>
            <Input id="unit-type" placeholder="e.g., 1 Bedroom, Studio" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit-status">Status</Label>
            <Select value={status}>
              <SelectTrigger id="unit-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>{unit ? 'Update' : 'Add'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UnitDialog
