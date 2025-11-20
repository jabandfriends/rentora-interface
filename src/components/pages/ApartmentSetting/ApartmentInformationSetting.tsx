import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import {
  Button,
  Card,
  Form,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  InputNumber,
  Spinner,
  Textarea,
} from '@/components/common'
import { PageTableEmpty } from '@/components/ui'
import { apartmentInformationFormSchema } from '@/constants'
import { useRentoraApiApartmentDetail, useRentoraApiUpdateApartment } from '@/hooks'
import type { ApartmentInformationFormSchema, IUpdateApartmentRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

const ApartmentInformationSetting = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: apartment, isLoading: isApartmentLoading } = useRentoraApiApartmentDetail({ apartmentId: apartmentId! })
  const { mutateAsync: updateApartment, isPending: isUpdateApartmentPending } = useRentoraApiUpdateApartment({
    apartmentId: apartmentId!,
  })
  const form = useForm<ApartmentInformationFormSchema>({
    resolver: zodResolver(apartmentInformationFormSchema),
    defaultValues: {
      apartmentName: '',
      phoneNumber: '',
      address: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
    },
  })

  useEffect(() => {
    if (apartment) {
      form.reset({
        apartmentName: apartment?.name,
        phoneNumber: apartment?.phoneNumber,
        address: apartment?.address,
        country: apartment?.country,
        state: apartment?.state,
        city: apartment?.city,
        postalCode: apartment?.postalCode,
      })
    }
  }, [apartment, form])

  const onSubmit = useCallback(
    (data: ApartmentInformationFormSchema) => {
      const updatePayload: IUpdateApartmentRequestPayload = {
        name: data.apartmentName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        country: data.country,
        state: data.state,
        city: data.city,
        postalCode: data.postalCode,
      }
      try {
        updateApartment(updatePayload)
        toast.success('Apartment information updated successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateApartment],
  )
  const isButtonDisabled = useMemo(() => {
    return isUpdateApartmentPending || isApartmentLoading
  }, [isUpdateApartmentPending, isApartmentLoading])

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
        <h4>Apartment Information</h4>
        <p className="text-body-2 text-theme-secondary">General details about your apartment complex</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="apartmentName"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="apartmentName">Apartment Name</FormLabel>
                  <Input maxLength={50} id="apartmentName" placeholder="Enter apartment name" {...field} />
                  <FormMessage />
                </div>
              )}
            />
          </div>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="phoneNumber">Contact Phone Number</FormLabel>
                  <InputNumber placeholder="Enter phone number" min={10} {...field} />
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Textarea id="address" placeholder="Enter full address" rows={3} maxLength={150} {...field} />
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Input maxLength={50} placeholder="Enter country" {...field} />
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="state">State</FormLabel>
                    <Input maxLength={50} placeholder="Enter state" {...field} />
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input maxLength={50} placeholder="Enter city" {...field} />
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                    <InputNumber max={5} placeholder="Enter postal code" {...field} />
                    <FormMessage />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button disabled={isButtonDisabled} className="desktop:w-auto w-full" type="submit">
              {isButtonDisabled ? <Spinner className="size-4" /> : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ApartmentInformationSetting
