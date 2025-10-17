import { Building2, ChevronDown, ChevronUp, Edit, PackageOpen, Plus, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Card, CardContent, CardHeader } from '@/components/common'
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
import { useRentoraApiDeleteBuilding, useRentoraApiFloorList } from '@/hooks'
import type { IBuilding, IFloor } from '@/types'
import { getErrorMessage } from '@/utilities'

import BuildingDialogUpdate from './BuildingDialogUpdate'
import FloorDialog from './FloorDialog'
import FloorSection from './FloorSection'

interface BuildingCardProps {
  building: IBuilding
}
const BuildingCard = ({ building }: BuildingCardProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [expanded, setExpanded] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [floorDialogOpen, setFloorDialogOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

  const { data: floors } = useRentoraApiFloorList({ buildingId: building.id })

  //delete hook
  const { mutateAsync: deleteBuilding } = useRentoraApiDeleteBuilding({ apartmentId: apartmentId! })

  //building
  const handleDeleteDialogOpen = useCallback(() => setDeleteDialogOpen(true), [])
  const handleUpdateDialogOpen = useCallback(() => setUpdateDialogOpen(true), [])

  //floor
  const handleFloorCreateDialogOpen = useCallback(() => setFloorDialogOpen(true), [])

  //handle delete
  const handleDeleteBuilding = useCallback(async () => {
    try {
      await deleteBuilding({ buildingId: building.id })
      toast.success('Building deleted successfully')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [deleteBuilding, building.id])

  //handle expand
  const handleExpand = useCallback(() => setExpanded(!expanded), [expanded])
  return (
    <>
      <Card className="border-theme-secondary-300 overflow-hidden rounded-2xl border duration-200">
        <CardHeader className="border-theme-secondary-300 border-b">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 items-start gap-3">
              <div className="bg-theme-primary/10 rounded-lg p-2">
                <Building2 className="text-theme-primary size-5" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1 font-semibold">{building.name}</h4>

                <div className="text-theme-secondary text-body-2 mt-2">
                  {floors?.length} floor{floors?.length !== 1 ? 's' : ''} •{' '}
                  {floors?.reduce((acc, floor) => acc + floor.totalUnits, 0)} unit
                  {floors?.reduce((acc, floor) => acc + floor.totalUnits, 0) !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex items-center" size="icon" onClick={handleUpdateDialogOpen}>
                <Edit className="size-4" />
              </Button>
              <Button variant="ghost" className="flex items-center" size="icon" onClick={handleDeleteDialogOpen}>
                <Trash2 className="text-theme-error size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="flex items-center" onClick={handleExpand}>
                {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        {expanded && (
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-foreground font-semibold">Floors & Units</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFloorCreateDialogOpen}
                className="flex items-center gap-2"
              >
                <Plus className="size-4" />
                Add Floor
              </Button>
            </div>

            {floors?.length === 0 ? (
              <div className="bg-theme-secondary-100/30 border-theme-secondary-300 flex flex-col items-center space-y-2 rounded-lg border-2 border-dashed py-8 text-center">
                <PackageOpen className="text-theme-secondary size-8" />
                <p className="text-theme-secondary text-body-2">No floors added yet</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFloorDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="size-3" />
                  Add First Floor
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {floors?.map((floor: IFloor) => (
                  <FloorSection
                    buildingId={building.id}
                    key={floor.buildingId + floor.floorName + floor.floorNumber}
                    floor={floor}
                  />
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <BuildingDialogUpdate open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} buildingId={building.id} />
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Building</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{building.name}"? This action cannot be undone and will remove all floors
              and units.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBuilding} className="bg-theme-error hover:bg-theme-error/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <FloorDialog buildingId={building.id} open={floorDialogOpen} onOpenChange={setFloorDialogOpen} />
    </>
  )
}

export default BuildingCard
