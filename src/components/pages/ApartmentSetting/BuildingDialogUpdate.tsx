import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Form, FormField, FormMessage, Input, InputNumber, Label, Textarea } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/feature'
import { updateBuildingSchema } from '@/constants'
import { useRentoraApiBuildingDetail, useRentoraUpdateBuilding } from '@/hooks'
import type { IUpdateBuildingRequestPayload, UpdateBuildingSchema } from '@/types'
import { getErrorMessage } from '@/utilities'

type IBuildingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  buildingId: string
}

const BuildingDialogUpdate = ({ open, onOpenChange, buildingId }: IBuildingDialogProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const handleDialogClose = useCallback(() => onOpenChange(false), [onOpenChange])
  const form = useForm<UpdateBuildingSchema>({
    resolver: zodResolver(updateBuildingSchema),
    defaultValues: {
      name: '',
      description: '',
      totalFloor: 0,
    },
  })
  const { data: buildingData } = useRentoraApiBuildingDetail({ apartmentId: apartmentId!, buildingId })
  const { mutateAsync: updateBuilding } = useRentoraUpdateBuilding({ apartmentId: apartmentId!, buildingId })

  useEffect(() => {
    if (buildingData) {
      form.reset({
        name: buildingData.name,
        description: buildingData.description ?? '',
        totalFloor: buildingData.totalFloors,
      })
    }
  }, [buildingData, form])

  const handleUpdateBuilding = useCallback(
    async (data: UpdateBuildingSchema) => {
      const payload: IUpdateBuildingRequestPayload = {
        name: data.name,
        ...(data.description ? { description: data.description } : {}),
        totalFloors: data.totalFloor,
      }
      try {
        await updateBuilding(payload)
        toast.success('Building updated successfully')
        form.reset()
        handleDialogClose()
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [updateBuilding, handleDialogClose, form],
  )
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Building</DialogTitle>
          <DialogDescription> Update building information </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateBuilding)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="name">Building Name</Label>
                  <Input maxLength={50} id="name" placeholder="e.g., Sunrise Tower" {...field} />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea maxLength={200} id="description" placeholder="e.g., Sunrise Tower" {...field} />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="totalFloor"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="totalFloor">Total Floor</Label>
                  <InputNumber
                    id="totalFloor"
                    placeholder="e.g., 10"
                    maxLength={3}
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
                Update Building
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BuildingDialogUpdate
