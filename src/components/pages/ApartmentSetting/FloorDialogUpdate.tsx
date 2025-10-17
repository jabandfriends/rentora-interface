import { zodResolver } from '@hookform/resolvers/zod'
import type { SetStateAction } from 'jotai'
import { type Dispatch, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Form, FormField, FormMessage, Input, InputNumber, Label } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/feature'
import { floorUpdateSchema } from '@/constants'
import { useRentoraUpdateFloor } from '@/hooks'
import type { FloorUpdateSchema, IFloor, IUpdateFloorPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

interface FloorDialogProps {
  buildingId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  floor: IFloor
}

const FloorDialogUpdate = ({ buildingId, open, onOpenChange, floor }: FloorDialogProps) => {
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  //create form
  const form = useForm<FloorUpdateSchema>({
    resolver: zodResolver(floorUpdateSchema),
    defaultValues: {
      floorName: '',
      floorNumber: undefined,
      totalUnits: undefined,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (floor) {
      form.reset({
        floorName: floor.floorName,
        floorNumber: floor.floorNumber,
        totalUnits: floor.totalUnits,
      })
    }
  }, [floor, form])

  //update hook
  const { mutateAsync: updateFloor } = useRentoraUpdateFloor({ buildingId, floorId: floor.floorId })

  const handleDialogClose = useCallback(() => onOpenChange(false), [onOpenChange])

  const handleCreateFloor = useCallback(
    async (data: FloorUpdateSchema) => {
      const payload: IUpdateFloorPayload = {
        ...data,
        buildingId,
      }
      try {
        await updateFloor(payload)
        toast.success('Floor updated successfully')
        form.reset()
        handleDialogClose()
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [buildingId, updateFloor, form, handleDialogClose],
  )
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Floor</DialogTitle>
          <DialogDescription>Update floor information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateFloor)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="floorName"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="floor-name">Floor Name</Label>
                  <Input maxLength={50} id="floor-name" placeholder="e.g., Floor 1, Ground Floor" {...field} />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="floorNumber"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="floor-number">Floor Number</Label>
                  <InputNumber
                    maxLength={6}
                    id="floor-number"
                    placeholder="e.g., 1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="totalUnits"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="total-units">Total Units</Label>
                  <InputNumber
                    maxLength={4}
                    id="total-units"
                    placeholder="e.g., 10"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </div>
              )}
            />
            {errorMessage && <p className="text-theme-error">{errorMessage}</p>}
            <div className="desktop:flex-row flex flex-col justify-end gap-2">
              <Button type="button" className="desktop:w-auto w-full" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit" className="desktop:w-auto w-full">
                Update floor
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default FloorDialogUpdate
