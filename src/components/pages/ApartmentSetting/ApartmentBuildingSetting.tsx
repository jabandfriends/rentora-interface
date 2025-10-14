import { Plus, X } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Button, Card, Input, InputNumber, Label, Spinner } from '@/components/common'
import { Badge, PageTableEmpty } from '@/components/ui'
import { useRentoraApiBuildingListNoPaginate } from '@/hooks'
import type { IBuilding } from '@/types'

const ApartmentBuildingSetting = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: buildings, isLoading: isLoadingBuildings } = useRentoraApiBuildingListNoPaginate({ apartmentId })

  if (isLoadingBuildings) {
    return (
      <PageTableEmpty
        icon={<Spinner />}
        description="Please wait while loading buildings..."
        message="Loading buildings..."
      />
    )
  }
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
            {buildings ? (
              buildings.map((building: IBuilding) => (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {building.name}: {building.floorCount} Floors
                  <X className="hover:text-theme-error h-3 w-3 cursor-pointer" />
                </Badge>
              ))
            ) : (
              <p className="text-body-2 text-theme-secondary">No buildings found</p>
            )}
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
