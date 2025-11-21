import { Edit, Layers, PackageOpen, Plus, Trash2 } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Spinner } from '@/components/common'
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
import { PageTableEmpty } from '@/components/ui'
import { DEFAULT_UNIT_LIST_DATA } from '@/constants'
import { useRentoraApiDeleteFloor, useRentoraApiUnitList } from '@/hooks'
import type { IFloor, IUnit } from '@/types'
import { getErrorMessage } from '@/utilities'

import FloorDialogUpdate from './FloorDialogUpdate'
import UnitCard from './UnitCard'
import UnitDialog from './UnitDialog'

type IFloorSectionProps = {
  floor: IFloor
  buildingId: string
}

const FloorSection = ({ floor, buildingId }: IFloorSectionProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [deleteDialogOpen, setDeleteDialogOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [floorDialogOpen, setFloorDialogOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [unitDialogOpen, setUnitDialogOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_UNIT_LIST_DATA.page,
  )

  //unit list
  const {
    data: units,
    isLoading: unitListLoading,
    pagination: { totalElements, totalPages },
  } = useRentoraApiUnitList({
    apartmentId: apartmentId!,
    params: {
      page: currentPage,
      size: DEFAULT_UNIT_LIST_DATA.size,
      buildingName: floor.buildingName,
      floorId: floor.floorId,
    },
  })

  //floor delete
  const { mutateAsync: deleteFloor } = useRentoraApiDeleteFloor({ buildingId })

  const handlePageChange = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }, [])

  //handle dialog update open
  const handleUpdateDialogOpen = useCallback(() => setFloorDialogOpen(true), [])
  //handle dialog delete open
  const handleDeleteDialogOpen = useCallback(() => setDeleteDialogOpen(true), [])
  //handle delete
  const handleDeleteFloor = useCallback(async () => {
    try {
      await deleteFloor(floor.floorId)
      toast.success('Floor deleted successfully')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [deleteFloor, floor.floorId])

  if (unitListLoading) {
    return (
      <PageTableEmpty
        icon={<Spinner />}
        message="Loading units..."
        description="Please wait while we load the units."
      />
    )
  }

  return (
    <>
      <div className="bg-card border-theme-secondary-300 rounded-lg border p-4">
        <div className="desktop:flex-row desktop:items-center mb-4 flex flex-col justify-between gap-y-2">
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
            <Button onClick={handleUpdateDialogOpen} className="flex items-center gap-2" variant="outline" size="icon">
              <Edit className="h-3 w-3" />
            </Button>
            <Button onClick={handleDeleteDialogOpen} className="flex items-center gap-2" variant="outline" size="icon">
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
          <div className="space-y-2">
            {units?.length > 0 ? (
              <div className="desktop:grid-cols-3 grid grid-cols-1 gap-3">
                {units?.map((unit: IUnit) => (
                  <UnitCard key={unit.id} unit={unit} />
                ))}
              </div>
            ) : (
              <PageTableEmpty icon={<PackageOpen />} message="No units found on this floor" />
            )}
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
            <AlertDialogAction onClick={handleDeleteFloor} className="bg-theme-error hover:bg-theme-error/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UnitDialog
        floorId={floor.floorId}
        open={unitDialogOpen}
        onOpenChange={setUnitDialogOpen}
        buildingName={floor.buildingName}
      />
      <FloorDialogUpdate
        buildingId={buildingId}
        floor={floor}
        open={floorDialogOpen}
        onOpenChange={setFloorDialogOpen}
      />
    </>
  )
}

export default FloorSection
