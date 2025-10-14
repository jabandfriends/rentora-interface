import { Plus, X } from 'lucide-react'

import { Button, Card, Input, InputNumber, Label } from '@/components/common'
import { Badge } from '@/components/ui'

const ApartmentBuildingSetting = () => {
  return (
    <Card className="justify-start rounded-xl shadow">
      <div>
        <h5>Building Information</h5>
        <p className="text-body-2 text-theme-secondary">Add and manage buildings in your apartment complex</p>
      </div>
      <div className="space-y-4">
        {/* Building List */}
        <div className="space-y-2">
          <Label>Buildings</Label>
          <div className="flex flex-col gap-2">
            {/* Example building items */}
            <Badge variant="secondary" className="flex items-center gap-1">
              Building A: 5 Floors
              <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              Building B: 3 Floors
              <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
            </Badge>
          </div>
        </div>

        {/* Add New Building */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="buildingName">Building Name</Label>
            <Input id="buildingName" placeholder="Enter building name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floors">Number of Floors</Label>
            <InputNumber placeholder="Floors" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="flex items-center gap-2" variant="outline">
            <Plus className="h-4 w-4" />
            Add Building
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ApartmentBuildingSetting
