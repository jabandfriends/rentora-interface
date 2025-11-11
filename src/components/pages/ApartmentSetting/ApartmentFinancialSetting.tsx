import { zodResolver } from '@hookform/resolvers/zod'
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
import { InfoTooltip } from '@/components/feature'
import { PageTableEmpty } from '@/components/ui'
import { APARTMENT_LATE_FEE_TYPE } from '@/enum'
import { useRentoraApiApartmentDetail, useRentoraApiUpdateApartment } from '@/hooks'
import type { IUpdateApartmentRequestPayload, Maybe } from '@/types'
import { getErrorMessage } from '@/utilities'

const apartmentFinancialFormSchema = z.object({
  paymentDueDay: z.string().optional(),
  lateFee: z.string().optional(),
  lateFeeType: z.enum(APARTMENT_LATE_FEE_TYPE).optional(),
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
      lateFeeType: APARTMENT_LATE_FEE_TYPE.FIXED,
      gracePeriodDays: '',
      taxId: '',
    },
  })

  const [lateFeeType]: [Maybe<APARTMENT_LATE_FEE_TYPE>] = form.watch(['lateFeeType'])

  //late fee title
  const { title }: { title: string } = useMemo(() => {
    return {
      title: lateFeeType === APARTMENT_LATE_FEE_TYPE.FIXED ? 'Late Fee' : 'Late Fee (%)',
    }
  }, [lateFeeType])

  useEffect(() => {
    if (apartment) {
      const values = {
        paymentDueDay: String(apartment.paymentDueDay ?? 10),
        lateFee: String(apartment.lateFee ?? 0),
        lateFeeType: apartment.lateFeeType ?? APARTMENT_LATE_FEE_TYPE.FIXED,
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
        lateFeeType: data.lateFeeType ?? APARTMENT_LATE_FEE_TYPE.FIXED,
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
        <h4>Apartment Financial Setting</h4>
        <p className="text-body-2 text-theme-secondary">Configure payment due day and late fee</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <FormField
                  control={form.control}
                  name="paymentDueDay"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="paymentDueDay">
                        Payment Due Day
                        <InfoTooltip>
                          The payment due day is calculated by adding the number of days you select here to the invoice
                          generation date. For example, if you enter 10, the due date will be 10 days after the invoice
                          is generated.
                        </InfoTooltip>
                      </Label>
                      <Select onValueChange={field.onChange} value={field.value} key={`payment-${field.value}`}>
                        <SelectTrigger className="w-full">
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
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="gracePeriodDays"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="gracePeriodDays">
                        Grace Period Days
                        <InfoTooltip>
                          The grace period is the number of days after the payment due day when late fees begin to
                          accrue.
                        </InfoTooltip>
                      </Label>
                      <Select value={field.value} key={`grace-${field.value}`} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
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
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <FormField
                  control={form.control}
                  name="lateFee"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="lateFee">{title}</Label>
                      <InputNumber decimal maxLength={8} placeholder="Enter late fee" {...field} />
                    </div>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="lateFeeType"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="lateFeeType">Late Fee Type</Label>
                      <Select onValueChange={field.onChange} value={field.value} key={`lateFeeType-${field.value}`}>
                        <SelectTrigger className="w-full capitalize">
                          <SelectValue placeholder="Select late fee type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(APARTMENT_LATE_FEE_TYPE).map((type) => (
                            <SelectItem className="capitalize" key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>
            </div>

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
                {isUpdateApartmentPending ? <Spinner className="size-4" /> : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ApartmentFinancialSetting
