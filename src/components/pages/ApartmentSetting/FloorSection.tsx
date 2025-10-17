import { Edit, Layers, Plus, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  PaginationBar,
} from '@/components/feature'
import { DEFAULT_UNIT_LIST_DATA } from '@/constants'
import { useRentoraApiUnitList } from '@/hooks'
import type { IFloor, IUnit } from '@/types'

import FloorDialog from './FloorDialog'
import UnitCard from './UnitCard'
import UnitDialog from './UnitDialog'

type IFloorSectionProps = {
  floor: IFloor
}

const FloorSection = ({ floor }: IFloorSectionProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [floorDialogOpen, setFloorDialogOpen] = useState(false)
  const [unitDialogOpen, setUnitDialogOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(DEFAULT_UNIT_LIST_DATA.page)

  const {
    data: units,
    pagination: { totalElements, totalPages },
  } = useRentoraApiUnitList({
    apartmentId: apartmentId!,
    params: {
      buildingName: floor.buildingName,
      floorId: floor.floorId,
    },
  })

  const handlePageChange = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }, [])

  return (
    <>
      <div className="bg-card border-theme-secondary-300 rounded-lg border p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-theme-secondary/30 rounded p-1.5">
              <Layers className="text-theme-secondary h-4 w-4" />
            </div>
            <div>
              <h5 className="font-semibold">{floor.floorName}</h5>
              <p className="text-body-2 text-theme-secondary">
                {floor.totalUnits} unit{floor.totalUnits !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setFloorDialogOpen(true)}
              className="flex items-center gap-2"
              variant="outline"
              size="icon"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => setDeleteDialogOpen(true)}
              className="flex items-center gap-2"
              variant="outline"
              size="icon"
            >
              <Trash2 className="text-theme-error h-3 w-3" />
            </Button>
            <Button onClick={() => setUnitDialogOpen(true)} className="flex items-center gap-2" variant="outline">
              <Plus className="h-3 w-3" />
              Add Unit
            </Button>
          </div>
        </div>

        {floor.totalUnits === 0 ? (
          <div className="bg-theme-secondary/20 border-border rounded border-2 border-dashed py-6 text-center">
            <p className="text-body-2 text-theme-secondary mb-2">No units on this floor</p>
            <Button className="flex items-center gap-2" variant="outline">
              <Plus className="h-3 w-3" />
              Add Unit
            </Button>
          </div>
        ) : (
          <div>
            <div className="desktop:grid-cols-3 grid grid-cols-2 gap-3">
              {units?.map((unit: IUnit) => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  onEdit={() => console.log('edit')}
                  onDelete={() => console.log('delete')}
                />
              ))}
            </div>
            {units?.length > 0 && (
              <PaginationBar
                page={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Floor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{floor.floorName}"? This will remove all units on this floor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UnitDialog
        onSave={() => console.log('save')}
        unit={null}
        open={unitDialogOpen}
        onOpenChange={setUnitDialogOpen}
      />

      <FloorDialog open={floorDialogOpen} onOpenChange={setFloorDialogOpen} floor={floor} />
    </>
  )
}

export default FloorSection
