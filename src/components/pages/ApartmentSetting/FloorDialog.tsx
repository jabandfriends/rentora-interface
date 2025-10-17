import React from 'react'

import { Button, Input, Label } from '@/components/common'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/feature'
import type { IFloor } from '@/types'

interface FloorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  floor?: IFloor
}

const FloorDialog = ({ open, onOpenChange, floor }: FloorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{floor ? 'Edit Floor' : 'Add New Floor'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="floor-name">Floor Name</Label>
            <Input id="floor-name" placeholder="e.g., Floor 1, Ground Floor" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>{floor ? 'Update' : 'Add'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FloorDialog
