import { zodResolver } from '@hookform/resolvers/zod'
import type { SetStateAction } from 'jotai'
import { type Dispatch, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Form, FormField, FormMessage, Input, Label } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/feature'
import { unitCreateFormSchema } from '@/constants'
import { useRentoraApiCreateUnit } from '@/hooks'
import type { ICreateUnitRequestPayload, UnitCreateFormSchema } from '@/types'
import { getErrorMessage } from '@/utilities'

interface UnitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  floorId: string
  buildingName: string
}

const UnitDialog = ({ open, onOpenChange, floorId, buildingName }: UnitDialogProps) => {
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const form = useForm<UnitCreateFormSchema>({
    resolver: zodResolver(unitCreateFormSchema),
    defaultValues: {
      unitName: '',
    },
  })
  //hooks to create
  const { mutateAsync: createUnit } = useRentoraApiCreateUnit({
    apartmentId: apartmentId!,
    buildingName: buildingName,
    floorId,
  })
  //handle close dialog
  const handleCloseDialog = useCallback(() => onOpenChange(false), [onOpenChange])
  const handleCreateUnit = useCallback(
    async (data: UnitCreateFormSchema) => {
      const payload: ICreateUnitRequestPayload = {
        floorId: floorId,
        unitName: data.unitName,
      }
      try {
        await createUnit(payload)
        toast.success('Unit created successfully')
        form.reset()
        handleCloseDialog()
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [createUnit, floorId, form, handleCloseDialog],
  )
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Unit</DialogTitle>
          <DialogDescription> Fill in the form below to create a new unit.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateUnit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="unitName"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="unit-name">Unit Name</Label>
                  <Input maxLength={50} id="unit-name" placeholder="e.g., Unit 101" {...field} />
                  <FormMessage />
                </div>
              )}
            />

            {errorMessage && <p className="text-theme-error">{errorMessage}</p>}
            <div className="desktop:flex-row flex flex-col items-center justify-end gap-2">
              <Button type="button" className="desktop:w-auto w-full" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="desktop:w-auto w-full">
                Create new unit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UnitDialog
