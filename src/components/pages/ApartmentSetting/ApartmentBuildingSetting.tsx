import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Card, Spinner } from '@/components/common'
import { PageTableEmpty } from '@/components/ui'
import { useRentoraApiBuildingListNoPaginate } from '@/hooks'
import type { IBuilding } from '@/types'

import BuildingCard from './BuildingCard'
import BuildingDialog from './BuildingDialog'

const ApartmentBuildingSetting = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: buildings, isLoading: isLoadingBuildings } = useRentoraApiBuildingListNoPaginate({ apartmentId })

  const [dialogOpen, setDialogOpen] = useState(false)

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
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <div>
          <h5>Building Information</h5>
          <p className="text-body-2 text-theme-secondary">Add and manage buildings in your apartment complex</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="size-4" />
          Add Building
        </Button>
      </div>
      <div className="space-y-4">
        {/* Building List */}
        <div className="space-y-2">
          <div className="flex flex-col gap-2">
            {/* Example building items */}
            <BuildingDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            {buildings ? (
              buildings.map((building: IBuilding) => (
                <BuildingCard
                  key={building.id}
                  building={building}
                  onUpdate={() => console.log('Update')}
                  onEdit={() => console.log('Update')}
                  onDelete={() => console.log('Delete')}
                />
              ))
            ) : (
              <p className="text-body-2 text-theme-secondary">No buildings found</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ApartmentBuildingSetting
