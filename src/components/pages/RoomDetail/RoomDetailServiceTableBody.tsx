import { Trash2 } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

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
} from '@/components/feature'
import { PageTableEmpty, TableBody, TableCell, TableRow } from '@/components/ui'
import { useRentoraApiDeleteUnitService } from '@/hooks'
import type { IUnitService, Maybe } from '@/types'
import { formatCurrency, getErrorMessage } from '@/utilities'

type IRoomDetailServiceTableBodyProps = {
  unitServices: Maybe<Array<IUnitService>>
  isLoading: boolean
}
const RoomDetailServiceTableBody = ({ unitServices, isLoading }: IRoomDetailServiceTableBodyProps) => {
  //delete hook

  const [isOpenDeleteDialog, setIsOpenDeleteDialog]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const handleDeleteDialogOpen = useCallback(() => setIsOpenDeleteDialog(true), [])

  const totalCostUnitService: number = useMemo(
    () => (unitServices ? unitServices.reduce((sum, s) => sum + s.price, 0) : 0),
    [unitServices],
  )
  const totalCostUnitServiceText: string = useMemo(() => formatCurrency(totalCostUnitService), [totalCostUnitService])

  //handle loading and no data
  if (isLoading)
    return (
      <TableBody>
        <TableRow aria-colspan={3}>
          <TableCell colSpan={3}>
            <PageTableEmpty
              message="Loading..."
              icon={<Spinner />}
              description="Please wait while we load your data."
            />
          </TableCell>
        </TableRow>
      </TableBody>
    )
  if (!unitServices || unitServices.length === 0)
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <PageTableEmpty message="No services found" description="Please add a service to this units." />
          </TableCell>
        </TableRow>
      </TableBody>
    )

  return (
    <TableBody>
      {unitServices.map((unitService: IUnitService) => (
        <UnitServiceRow
          key={unitService.id}
          unitService={unitService}
          isOpenDeleteDialog={isOpenDeleteDialog}
          setIsOpenDeleteDialog={setIsOpenDeleteDialog}
          handleDeleteDialogOpen={handleDeleteDialogOpen}
        />
      ))}

      <TableRow className="border-border border-t p-4">
        <TableCell className="font-semibold">Total</TableCell>
        <TableCell className="text-theme-primary font-bold">{totalCostUnitServiceText}</TableCell>
      </TableRow>
    </TableBody>
  )
}

type IUnitServiceRowProps = {
  unitService: IUnitService
  handleDeleteDialogOpen: () => void
  isOpenDeleteDialog: boolean
  setIsOpenDeleteDialog: (isOpen: boolean) => void
}
const UnitServiceRow = ({
  unitService,
  handleDeleteDialogOpen,
  isOpenDeleteDialog,
  setIsOpenDeleteDialog,
}: IUnitServiceRowProps) => {
  const { mutateAsync: deleteUnitService } = useRentoraApiDeleteUnitService()

  const handleDeleteUnitService = useCallback(async () => {
    try {
      await deleteUnitService({ unitServiceId: unitService.id })
      toast.success('Unit service deleted successfully')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [deleteUnitService, unitService])

  return (
    <>
      <AlertDialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Unit Service</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this unit service?</AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleDeleteUnitService}>Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <TableRow key={unitService.id}>
        <TableCell>{unitService.serviceName}</TableCell>
        <TableCell className="font-semibold">{formatCurrency(unitService.price)}</TableCell>
        <TableCell className="flex w-12 justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-theme-error-800 hover:bg-theme-error/10 hover:text-theme-error flex items-center"
            onClick={handleDeleteDialogOpen}
          >
            <Trash2 className="size-4" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}

export default RoomDetailServiceTableBody
