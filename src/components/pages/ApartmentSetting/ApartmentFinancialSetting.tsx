import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import z from 'zod'

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
import { useRentoraApiApartmentDetail, useRentoraApiUpdateApartment } from '@/hooks'
import type { IUpdateApartmentRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

const apartmentFinancialFormSchema = z.object({
  paymentDueDay: z.string().optional(),
  lateFee: z.string().optional(),
  gracePeriodDays: z.string().optional(),
  taxId: z.string().optional(),
})
type ApartmentFinancialFormSchema = z.infer<typeof apartmentFinancialFormSchema>
const ApartmentFinancialSetting = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: apartment, isLoading: isApartmentLoading } = useRentoraApiApartmentDetail({ apartmentId: apartmentId! })
  const { mutateAsync: updateApartment, isPending: isUpdateApartmentPending } = useRentoraApiUpdateApartment({
    apartmentId: apartmentId!,
  })
  const form = useForm<ApartmentFinancialFormSchema>({
    resolver: zodResolver(apartmentFinancialFormSchema),
    defaultValues: {
      paymentDueDay: '',
      lateFee: '',
      gracePeriodDays: '',
      taxId: '',
    },
  })

  useEffect(() => {
    if (apartment) {
      const values = {
        paymentDueDay: String(apartment.paymentDueDay ?? 10),
        lateFee: String(apartment.lateFee ?? 0),
        gracePeriodDays: String(apartment.gracePeriodDays ?? 10),
        taxId: apartment.taxId ?? '',
      }
      form.reset(values)
    }
  }, [apartment, form])

  const onSubmit = useCallback(
    (data: ApartmentFinancialFormSchema) => {
      const updatePayload: IUpdateApartmentRequestPayload = {
        paymentDueDay: data.paymentDueDay ? Number(data.paymentDueDay) : undefined,
        lateFee: data.lateFee ? Number(data.lateFee) : undefined,
        gracePeriodDays: data.gracePeriodDays ? Number(data.gracePeriodDays) : undefined,
        taxId: data.taxId ? data.taxId : undefined,
      }
      try {
        updateApartment(updatePayload)
        toast.success('Apartment financial setting updated successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateApartment],
  )

  const isButtonDisabled: boolean = useMemo(() => {
    return isUpdateApartmentPending
  }, [isUpdateApartmentPending])
  if (isApartmentLoading) {
    return (
      <PageTableEmpty
        icon={<Spinner />}
        message="Loading your apartment information"
        description="Please wait while we load your apartment information"
      />
    )
  }

  if (!apartment) {
    return <PageTableEmpty message="Apartment not found" />
  }

  return (
    <Card className="justify-start rounded-xl shadow">
      <div>
        <h5>Apartment Financial Setting</h5>
        <p className="text-body-2 text-theme-secondary">Configure payment due day and late fee</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="paymentDueDay"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="paymentDueDay">Payment Due Day</Label>
                  <Select onValueChange={field.onChange} value={field.value} key={`payment-${field.value}`}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment due day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="lateFee"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="lateFee">Late Fee</Label>
                  <InputNumber decimal placeholder="Enter late fee" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="gracePeriodDays"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="gracePeriodDays">Grace Period Days</Label>
                  <Select value={field.value} key={`grace-${field.value}`} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grace period days" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* TODO: 30 days */}
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <InputNumber max={13} placeholder="Enter tax ID" {...field} />
                </div>
              )}
            />
            <div className="flex justify-end">
              <Button
                className="desktop:w-auto flex w-full items-center gap-x-2"
                disabled={isButtonDisabled}
                type="submit"
              >
                <Save /> Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ApartmentFinancialSetting
