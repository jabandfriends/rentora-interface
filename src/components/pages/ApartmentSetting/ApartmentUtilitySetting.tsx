import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import {
  Button,
  Card,
  Form,
  FormField,
  InputNumber,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/components/common'
import { PageTableEmpty } from '@/components/ui'
import { useRentoraApiUpdateUtility, useRentoraApiUtilityList } from '@/hooks'
import type { IUpdateUnitServiceRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

const apartmentUtilityFormSchema = z.object({
  waterUtilityId: z.string(),
  waterUtilityType: z.string().optional(),
  waterUtilityUnitPrice: z.number().optional(),
  waterUtilityFixedPrice: z.number().optional(),
  electricUtilityId: z.string(),
  electricUtilityType: z.string().optional(),
  electricUtilityUnitPrice: z.number().optional(),
  electricUtilityFixedPrice: z.number().optional(),
})
type ApartmentUtilityFormSchema = z.infer<typeof apartmentUtilityFormSchema>
const ApartmentUtilitySetting = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  //get data first
  const { data: utilityList, isLoading: isUtilityListLoading } = useRentoraApiUtilityList({ apartmentId: apartmentId! })

  //update data
  const { mutateAsync: updateUtility } = useRentoraApiUpdateUtility({ apartmentId: apartmentId! })

  const form = useForm<ApartmentUtilityFormSchema>({
    resolver: zodResolver(apartmentUtilityFormSchema),
    defaultValues: {
      waterUtilityId: '',
      waterUtilityType: 'meter',
      waterUtilityUnitPrice: 0,
      waterUtilityFixedPrice: 0,
      electricUtilityId: '',
      electricUtilityType: 'meter',
      electricUtilityUnitPrice: 0,
      electricUtilityFixedPrice: 0,
    },
  })

  useEffect(() => {
    if (!utilityList) return

    const formValues = utilityList.reduce(
      (acc, utility) => {
        const name = utility.utilityName.toLowerCase() // e.g., "water"
        acc[`${name}UtilityId`] = utility.utilityId
        acc[`${name}UtilityType`] = utility.utilityType
        acc[`${name}UtilityUnitPrice`] = utility.utilityUnitPrice
        acc[`${name}UtilityFixedPrice`] = utility.utilityFixedPrice
        return acc
      },
      {} as Record<string, any>,
    )

    form.reset(formValues)
  }, [utilityList, form])

  const handleSubmit = useCallback(
    (data: ApartmentUtilityFormSchema) => {
      try {
        const payload: IUpdateUnitServiceRequestPayload = {
          waterUtilityId: data.waterUtilityId,
          waterUtilityType: data.waterUtilityType ?? 'meter',
          waterUtilityUnitPrice: data.waterUtilityUnitPrice ?? 0,
          waterUtilityFixedPrice: data.waterUtilityFixedPrice ?? 0,
          electricUtilityId: data.electricUtilityId,
          electricUtilityType: data.electricUtilityType ?? 'meter',
          electricUtilityUnitPrice: data.electricUtilityUnitPrice ?? 0,
          electricUtilityFixedPrice: data.electricUtilityFixedPrice ?? 0,
        }
        updateUtility(payload)
        toast.success('Utility updated successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateUtility],
  )

  if (isUtilityListLoading)
    return <PageTableEmpty icon={<Spinner />} message="Loading utility list" description="Please wait..." />

  if (!utilityList)
    return <PageTableEmpty icon={<Spinner />} message="No utility list" description="Please try again later" />

  return (
    <Card className="justify-start rounded-xl shadow">
      <div>
        <h4>Utility Water and Electric</h4>
        <p className="text-body-2 text-theme-secondary">
          Manage utility water and electric in your complex (will add to monthly rent)
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-3 gap-4 space-y-2">
            <FormField
              control={form.control}
              name="waterUtilityType"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="lateFee">Water Utility Type</Label>
                  <Select onValueChange={field.onChange} value={field.value} key={'waterUtilityType' + field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water utility type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="meter">Meter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="waterUtilityUnitPrice"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="gracePeriodDays">Water Utility Price (THB/Unit)</Label>
                  <InputNumber maxLength={9} placeholder="Enter water utility price" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="waterUtilityFixedPrice"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="gracePeriodDays">Water Utility Fixed Price (THB)</Label>
                  <InputNumber maxLength={9} placeholder="Enter water utility fixed price" {...field} />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 space-y-2">
            <FormField
              control={form.control}
              name="electricUtilityType"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="lateFee">Electric Utility Type</Label>
                  <Select onValueChange={field.onChange} value={field.value} key={'electricUtilityType' + field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water utility type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="meter">Meter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="electricUtilityUnitPrice"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="gracePeriodDays">Electric Utility Price (THB/Unit)</Label>
                  <InputNumber maxLength={9} placeholder="Enter electric utility price" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="electricUtilityFixedPrice"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="gracePeriodDays">Electric Utility Fixed Price (THB)</Label>
                  <InputNumber maxLength={9} placeholder="Enter electric utility fixed price" {...field} />
                </div>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button className="desktop:w-auto flex w-full items-center gap-x-2" type="submit">
              <Save /> Save
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ApartmentUtilitySetting
