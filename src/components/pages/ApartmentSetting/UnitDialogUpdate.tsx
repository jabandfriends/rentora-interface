import { zodResolver } from '@hookform/resolvers/zod'
import type { SetStateAction } from 'jotai'
import { type Dispatch, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import {
  Button,
  Form,
  FormField,
  FormMessage,
  Input,
  InputNumber,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/feature'
import { unitUpdateFormSchema } from '@/constants'
import { UnitStatus } from '@/enum'
import { useRentoraApiUpdateUnit } from '@/hooks'
import type { IUnit, IUpdateUnitRequestPayload, UnitUpdateFormSchema } from '@/types'
import { getErrorMessage } from '@/utilities'

interface UnitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  buildingName: string
  unit: IUnit
}

const UnitDialogUpdate = ({ open, onOpenChange, unit }: UnitDialogProps) => {
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const form = useForm<UnitUpdateFormSchema>({
    resolver: zodResolver(unitUpdateFormSchema),
    defaultValues: {
      unitName: '',
      bedrooms: 0,
      bathrooms: 0,
      squareMeters: 0,
      balconyCount: 0,
      parkingCount: 0,
      status: UnitStatus.available,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (unit) {
      form.reset({
        unitName: unit.unitName,
        bedrooms: unit.bedrooms,
        bathrooms: unit.bathrooms,
        squareMeters: unit.squareMeters,
        balconyCount: unit.balconyCount,
        parkingCount: unit.parkingSpaces,
        status: unit.unitStatus,
      })
    }
  }, [unit, form])
  //hooks to create
  const { mutateAsync: updateUnit } = useRentoraApiUpdateUnit({
    apartmentId: apartmentId!,
    unitId: unit.id,
  })
  //handle close dialog
  const handleCloseDialog = useCallback(() => onOpenChange(false), [onOpenChange])

  const handleUpdateUnit = useCallback(
    async (data: UnitUpdateFormSchema) => {
      const payload: IUpdateUnitRequestPayload = {
        status: data.status,
        unitName: data.unitName,
        ...(data.bedrooms ? { bedrooms: data.bedrooms } : {}),
        ...(data.bathrooms ? { bathrooms: data.bathrooms } : {}),
        squareMeters: data.squareMeters,
        ...(data.balconyCount ? { balconyCount: data.balconyCount } : {}),
        ...(data.parkingCount ? { parkingSpaces: data.parkingCount } : {}),
      }
      try {
        await updateUnit(payload)
        toast.success('Unit updated successfully')
        form.reset()
        handleCloseDialog()
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [updateUnit, form, handleCloseDialog],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Unit</DialogTitle>
          <DialogDescription> Fill in the form below to update a unit.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateUnit)} className="space-y-4 py-4">
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
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <InputNumber
                    maxLength={5}
                    id="bedrooms"
                    placeholder="e.g., 1 , 2, 3"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <InputNumber
                    maxLength={5}
                    id="bathrooms"
                    placeholder="e.g., 1 , 2, 3"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="squareMeters"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="square-meters">Square Meters</Label>
                  <InputNumber
                    maxLength={5}
                    id="square-meters"
                    placeholder="e.g., 23, 25"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="balconyCount"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="balcony-count">Balcony Count</Label>
                  <InputNumber
                    maxLength={5}
                    id="balcony-count"
                    placeholder="e.g., 1, 2"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="parkingCount"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="parking-count">Parking Count</Label>
                  <InputNumber
                    maxLength={5}
                    id="parking-count"
                    placeholder="e.g., 1, 2"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(UnitStatus).map((status) => (
                        <SelectItem className="capitalize" key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              )}
            />
            {errorMessage && <p className="text-theme-error">{errorMessage}</p>}
            <div className="desktop:flex-row flex flex-col items-center justify-end gap-2">
              <Button type="submit" className="desktop:w-auto w-full">
                Update unit
              </Button>
              <Button type="button" className="desktop:w-auto w-full" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UnitDialogUpdate
