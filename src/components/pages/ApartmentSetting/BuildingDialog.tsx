import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Form, FormField, FormMessage, Input, InputNumber, Label, Textarea } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/feature'
import { createBuildingSchema } from '@/constants'
import { useRentoraApiCreateBuilding } from '@/hooks'
import type { CreateBuildingSchema, ICreateBuildingRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

type IBuildingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const BuildingDialog = ({ open, onOpenChange }: IBuildingDialogProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const handleDialogClose = useCallback(() => onOpenChange(false), [onOpenChange])

  const form = useForm<CreateBuildingSchema>({
    resolver: zodResolver(createBuildingSchema),
    defaultValues: {
      name: '',
      description: '',
      totalFloor: 1,
    },
    mode: 'onChange',
  })
  const { mutateAsync: createBuilding, isPending } = useRentoraApiCreateBuilding(apartmentId!)
  const handleCreateBuilding = useCallback(
    async (data: CreateBuildingSchema) => {
      const payload: ICreateBuildingRequestPayload = {
        apartmentId: apartmentId!,
        name: data.name,
        ...(data.description ? { description: data.description } : {}),
        totalFloors: data.totalFloor,
      }
      try {
        await createBuilding(payload)
        toast.success('Building created successfully')
        form.reset()
        handleDialogClose()
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [apartmentId, createBuilding, form, handleDialogClose],
  )

  const isButtonDisable = useMemo(
    () => form.formState.isSubmitting || isPending,
    [form.formState.isSubmitting, isPending],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Building</DialogTitle>
          <DialogDescription> Add a new building to your apartment complex </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateBuilding)} className="space-y-4 py-4">
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

            <div className="desktop:flex-row flex flex-col justify-end gap-2">
              <Button className="desktop:w-auto w-full" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button className="desktop:w-auto w-full" type="submit" disabled={isButtonDisable}>
                Create Building
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BuildingDialog
