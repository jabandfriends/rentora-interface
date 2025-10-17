import { Edit, Home, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Card, CardContent } from '@/components/common'
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
import { Badge } from '@/components/ui'
import { UnitStatus } from '@/enum'
import { useRentoraDeleteUnit } from '@/hooks'
import type { IUnit } from '@/types'
import { cn, getErrorMessage } from '@/utilities'

import UnitDialogUpdate from './UnitDialogUpdate'

const getStatusColor = (status: string) => {
  switch (status) {
    case UnitStatus.available:
      return 'bg-theme-success text-theme-white'
    case UnitStatus.occupied:
      return 'bg-theme-warning text-theme-white'
    case UnitStatus.maintenance:
      return 'bg-theme-error text-theme-white'
    default:
      return 'bg-theme-secondary text-theme-white'
  }
}

type IUnitCardProps = {
  unit: IUnit
}
const UnitCard = ({ unit }: IUnitCardProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [unitUpdateDialogOpen, setUnitUpdateDialogOpen] = useState(false)

  const handleUpdateDialogOpen = useCallback(() => setUnitUpdateDialogOpen(true), [])

  //delete unit
  const { mutateAsync: deleteUnit } = useRentoraDeleteUnit()

  const handleDeleteUnit = useCallback(async () => {
    try {
      await deleteUnit({ apartmentId: apartmentId!, unitId: unit.id })
      toast.success('Unit deleted successfully')
      setDeleteDialogOpen(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [deleteUnit, apartmentId, unit])

  //handle delete alert
  const handleDeleteAlertOpen = useCallback(() => setDeleteDialogOpen(true), [])
  const handleDeleteAlertClose = useCallback(() => setDeleteDialogOpen(false), [])
  return (
    <>
      <UnitDialogUpdate
        buildingName={unit.buildingName}
        open={unitUpdateDialogOpen}
        onOpenChange={setUnitUpdateDialogOpen}
        unit={unit}
      />
      <Card className="border-theme-secondary-300 group rounded-2xl border duration-200 hover:shadow-md">
        <CardContent className="p-4">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-theme-primary/5 rounded p-1.5">
                <Home className="text-theme-primary h-3.5 w-3.5" />
              </div>
              <div>
                <h6 className="text-body-2 font-semibold">{unit.unitName}</h6>
                <p className="text-theme-secondary text-body-2 capitalize">{unit.unitType}</p>
              </div>
            </div>
            <div className="desktop:opacity-0 flex gap-1 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="flex size-7 items-center gap-x-2"
                onClick={handleUpdateDialogOpen}
              >
                <Edit className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="flex size-7 items-center gap-x-2"
                onClick={handleDeleteAlertOpen}
              >
                <Trash2 className="text-theme-error size-4" />
              </Button>
            </div>
          </div>
          <Badge variant="secondary" className={cn('text-body-2 capitalize', getStatusColor(unit.unitStatus))}>
            {unit.unitStatus}
          </Badge>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={handleDeleteAlertClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Unit</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete "{unit.unitName}"?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUnit} className="bg-theme-error hover:bg-theme-error/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default UnitCard
