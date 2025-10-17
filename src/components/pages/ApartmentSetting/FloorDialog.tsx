import { zodResolver } from '@hookform/resolvers/zod'
import type { SetStateAction } from 'jotai'
import { type Dispatch, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Form, FormField, FormMessage, Input, InputNumber, Label } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/feature'
import { floorCreateSchema } from '@/constants'
import { useRentoraApiCreateFloor } from '@/hooks'
import type { FloorCreateSchema } from '@/types'
import { getErrorMessage } from '@/utilities'

interface FloorDialogProps {
  buildingId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FloorDialog = ({ buildingId, open, onOpenChange }: FloorDialogProps) => {
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const { apartmentId } = useParams<{ apartmentId: string }>()
  //create form
  const form = useForm<FloorCreateSchema>({
    resolver: zodResolver(floorCreateSchema),
    defaultValues: {
      floorName: '',
      floorNumber: undefined,
      totalUnits: undefined,
    },
    mode: 'onChange',
  })

  const { mutateAsync: createFloor } = useRentoraApiCreateFloor({ apartmentId: apartmentId!, buildingId })

  const handleDialogClose = useCallback(() => onOpenChange(false), [onOpenChange])

  const handleCreateFloor = useCallback(
    async (data: FloorCreateSchema) => {
      const payload = {
        ...data,
        buildingId,
      }
      try {
        await createFloor(payload)
        toast.success('Floor created successfully')
        form.reset()
        handleDialogClose()
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [buildingId, createFloor, form, handleDialogClose],
  )
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Floor</DialogTitle>
          <DialogDescription>
            Add a new floor to the building. This will allow you to manage the units and amenities on that floor.
          </DialogDescription>
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
                Create new floor
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default FloorDialog
