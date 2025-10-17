import { Building2, ChevronDown, ChevronUp, Edit, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

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
import { useRentoraApiFloorList } from '@/hooks'
import type { IBuilding, IFloor } from '@/types'

import FloorDialog from './FloorDialog'
import FloorSection from './FloorSection'

interface BuildingCardProps {
  building: IBuilding
  onEdit: (building: IBuilding) => void
  onDelete: (id: string) => void
  onUpdate: (building: IBuilding) => void
}
const BuildingCard = ({ building, onEdit, onDelete }: BuildingCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [floorDialogOpen, setFloorDialogOpen] = useState(false)

  const { data: floors } = useRentoraApiFloorList({ buildingId: building.id })

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
              <Button variant="ghost" size="icon" onClick={() => onEdit(building)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="text-destructive h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                onClick={() => setFloorDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="size-4" />
                Add Floor
              </Button>
            </div>

            {floors?.length === 0 ? (
              <div className="bg-theme-secondary-200/30 border-border rounded-lg border-2 border-dashed py-8 text-center">
                <p className="text-muted-foreground mb-3">No floors added yet</p>
                <Button variant="outline" size="sm" onClick={() => setFloorDialogOpen(true)} className="gap-2">
                  <Plus className="size-3" />
                  Add First Floor
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {floors?.map((floor: IFloor) => (
                  <FloorSection key={floor.buildingId + floor.floorName + floor.floorNumber} floor={floor} />
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

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
            <AlertDialogAction
              onClick={() => onDelete(building.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <FloorDialog open={floorDialogOpen} onOpenChange={setFloorDialogOpen} />
    </>
  )
}

export default BuildingCard
