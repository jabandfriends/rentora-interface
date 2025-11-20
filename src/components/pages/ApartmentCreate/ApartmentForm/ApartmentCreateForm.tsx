import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { Button, Card, Form, Spinner } from '@/components/common'
import { ApartmentFormField, ApartmentUpload } from '@/components/pages/ApartmentCreate'
import { APARTMENT_FORM_SCHEMA, APARTMENT_FORM_SECTIONS, ROUTES } from '@/constants'
import { APARTMENT_LATE_FEE_TYPE } from '@/enum'
import { useRentoraApiCreateApartment } from '@/hooks'
import type {
  APARTMENT_FORM_FIELD,
  APARTMENT_FORM_VALUES,
  ICreateApartmentRequestPayload,
  IRentoraApiClientCreateApartmentResponse,
} from '@/types'
import { getErrorMessage } from '@/utilities'

const ApartmentCreateForm = () => {
  const form = useForm<APARTMENT_FORM_VALUES>({
    resolver: zodResolver(APARTMENT_FORM_SCHEMA),
    defaultValues: {
      logoFile: [],
      name: '',
      address: '',
      phoneNumber: '',
      taxId: '',
      paymentDueDay: '',
      lateFee: '',
      lateFeeType: APARTMENT_LATE_FEE_TYPE.FIXED,
      gracePeriodDays: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  })
  const navigate: NavigateFunction = useNavigate()
  const { mutateAsync: createApartment, isPending } = useRentoraApiCreateApartment()

  //button status
  const isButtonDisabled: boolean = useMemo(() => {
    return isPending || !form.formState.isDirty || !form.formState.isValid
  }, [isPending, form.formState.isDirty, form.formState.isValid])

  //create apartment
  const onSubmit = useCallback(
    async (data: APARTMENT_FORM_VALUES) => {
      const { logoFile, ...rest } = data

      const firstFile: File | undefined = Array.isArray(logoFile) ? logoFile[0] : logoFile

      const dataPayload: ICreateApartmentRequestPayload = {
        ...rest,
        paymentDueDay: Number(data.paymentDueDay),
        lateFee: Number(data.lateFee),
        lateFeeType: APARTMENT_LATE_FEE_TYPE.FIXED,
        gracePeriodDays: Number(data.gracePeriodDays),
        logoFile: firstFile,
      }

      try {
        const response: IRentoraApiClientCreateApartmentResponse['data'] = await createApartment(dataPayload)
        toast.success('Apartment created successfully')
        setTimeout(() => {
          navigate(ROUTES.apartmentSetup.getUrl(response.apartmentId))
        }, 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [createApartment, navigate],
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Upload logo */}
          <Card className="rounded-lg py-4 hover:shadow-none">
            <ApartmentUpload control={form.control} form={form} />
          </Card>

          {/* Apartment Form Section */}
          {APARTMENT_FORM_SECTIONS.map((section) => (
            <Card className="space-y-2 rounded-lg py-4 hover:shadow-none">
              <div>
                <h3 className="flex items-center gap-x-2">
                  {section.icon}
                  {section.title}
                </h3>
                <p className="text-theme-secondary">{section.description}</p>
              </div>
              {section.fields.map(({ label, description, key, ...props }: APARTMENT_FORM_FIELD) => (
                <ApartmentFormField
                  control={form.control}
                  fieldKey={key}
                  label={label}
                  description={description}
                  {...props}
                />
              ))}
            </Card>
          ))}

          <Button disabled={isButtonDisabled} type="submit">
            {isPending ? <Spinner /> : 'Save Information'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ApartmentCreateForm
