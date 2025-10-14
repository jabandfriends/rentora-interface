import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { PageSection } from '@/components/layout'
import { Field, FormStep, MultiStepForm } from '@/components/ui'
import { apartmentDetailSchema, buildingSchema, paymentInformationSchema, ROUTES, serviceSchema } from '@/constants'
import { useRentoraApiApartmentDetail, useRentoraApiSetupApartment } from '@/hooks'
import type { ISetupApartmentRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

const ApartmentSetup = () => {
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data, isLoading } = useRentoraApiApartmentDetail({ apartmentId: apartmentId ?? '' })
  const { mutateAsync: setupApartment } = useRentoraApiSetupApartment()
  useEffect(() => {
    if (!isLoading && data) {
      return
    }
  }, [data, navigate, isLoading])

  if (!apartmentId) {
    navigate(ROUTES.allApartment.path)
    return null
  }

  const handleSubmit = async (data: any) => {
    const payload: ISetupApartmentRequestPayload = convertFormDataToPayload(apartmentId, data)
    try {
      await setupApartment(payload)
      toast.success('Setup apartment successfully')
      setTimeout(() => navigate(ROUTES.overview.getPath(apartmentId)), 1000)
    } catch (error: unknown) {
      toast.error(getErrorMessage(error))
    }
  }

  const convertFormDataToPayload = (id: string, formData: any): ISetupApartmentRequestPayload => ({
    apartmentId: id,
    bankName: formData.bankName,
    bankAccountHolder: formData.bankAccountHolder,
    bankAccountNumber: formData.bankAccountNumber,
    buildings: formData.buildings.map((b: { buildingName: string; totalFloor: string; totalUnitPerFloor: string }) => ({
      buildingName: b.buildingName,
      totalFloors: Number(b.totalFloor),
      totalUnitPerFloor: Number(b.totalUnitPerFloor),
    })),
    electricityFlat: Number(formData.electricityFlat),
    electricityPrice: Number(formData.electricityPrice),
    electricityType: formData.electricityType,
    services: formData.services.map((s: { name: string; price: string }) => ({
      name: s.name,
      price: Number(s.price),
    })),
    waterFlat: Number(formData.waterFlat),
    waterPrice: Number(formData.waterPrice),
    waterType: formData.waterType,
  })

  return (
    <PageSection className="flex flex-col items-center justify-center px-4">
      <MultiStepForm onSubmit={handleSubmit} title="Apartment Setup">
        <FormStep value="0" title="Extra Services" schema={serviceSchema}>
          <Field
            name="services"
            label="Services"
            type="list-object"
            objectFields={[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', required: true },
              { name: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', required: true },
            ]}
            required
          />
        </FormStep>

        <FormStep value="1" title="Apartment Detail" schema={apartmentDetailSchema}>
          <div className="desktop:grid-cols-2 grid gap-2">
            <div>
              <Field
                name="waterType"
                label="Water Type"
                type="select"
                placeholder="Select Water Type"
                options={[
                  { value: 'fixed', label: 'Fixed' },
                  { value: 'meter', label: 'Meter' },
                ]}
                required
              />
            </div>
            <div className="desktop:flex-row flex flex-col gap-x-2">
              <div>
                <Field name="waterPrice" label="Water Rate [ THB/Unit ]" type="number" className="w-full" required />
              </div>
              <div>
                <Field name="waterFlat" label="Water Flat [ THB ]" type="number" className="w-full" required />
              </div>
            </div>
          </div>

          <div className="desktop:grid-cols-2 grid gap-2">
            <div>
              <Field
                name="electricityType"
                label="Electricity Type"
                type="select"
                placeholder="Select Electricity Type"
                options={[
                  { value: 'fixed', label: 'Fixed' },
                  { value: 'meter', label: 'Meter' },
                ]}
                required
              />
            </div>

            <div className="desktop:flex-row flex flex-col gap-x-2">
              <div>
                <Field
                  name="electricityPrice"
                  label="Electricity Rate [ THB/Unit ]"
                  type="number"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Field
                  name="electricityFlat"
                  label="Electricity Flat [ THB ]"
                  type="number"
                  className="w-full"
                  required
                />
              </div>
            </div>
          </div>
        </FormStep>
        <FormStep value="2" title="Building Information" schema={buildingSchema}>
          <Field
            name="buildings"
            label="Building Information"
            type="list-object"
            objectFields={[
              {
                name: 'buildingName',
                label: 'Building Name',
                type: 'text',
                placeholder: 'Enter building name',
                required: true,
              },
              {
                name: 'totalFloor',
                label: 'Total Floor',
                type: 'number',
                placeholder: 'Enter total floor',
                required: true,
              },
              {
                name: 'totalUnitPerFloor',
                label: 'Total Unit Per Floor',
                type: 'number',
                placeholder: 'Enter total unit per floor',
                required: true,
              },
            ]}
            required
          />
        </FormStep>

        <FormStep value="3" title="Payment Information" schema={paymentInformationSchema}>
          <Field name="bankName" label="Bank Name" type="text" placeholder="Enter bank name" required />
          <Field
            name="bankAccountNumber"
            label="Bank Account Number"
            type="number"
            placeholder="Enter bank account number"
            required
          />
          <Field
            name="bankAccountHolder"
            label="Bank Account Holder"
            type="text"
            placeholder="Enter bank account holder"
            required
          />
        </FormStep>
      </MultiStepForm>
    </PageSection>
  )
}

export default ApartmentSetup
