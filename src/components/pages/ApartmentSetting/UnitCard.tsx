import { Edit, Home, Trash2 } from 'lucide-react'
import { useState } from 'react'

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
import type { IUnit } from '@/types'
import { cn } from '@/utilities'

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
  onEdit: (unit: IUnit) => void
  onDelete: (id: string) => void
}
const UnitCard = ({ unit, onEdit, onDelete }: IUnitCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  return (
    <>
      <Card className="border-theme-secondary-300 group rounded-2xl border duration-200 hover:shadow-md">
        <CardContent className="p-4">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-theme-primary/5 rounded p-1.5">
                <Home className="text-theme-primary h-3.5 w-3.5" />
              </div>
              <div>
                <h6 className="text-body-2 font-semibold">{unit.unitName}</h6>
                <p className="text-theme-secondary text-body-2">{unit.unitType}</p>
              </div>
            </div>
            <div className="desktop:opacity-0 flex gap-1 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(unit)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="text-theme-error h-3 w-3" />
              </Button>
            </div>
          </div>
          <Badge variant="secondary" className={cn('text-body-2 capitalize', getStatusColor(unit.unitStatus))}>
            {unit.unitStatus}
          </Badge>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Unit</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete "{unit.unitName}"?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(unit.id)} className="bg-theme-error hover:bg-theme-error/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default UnitCard
