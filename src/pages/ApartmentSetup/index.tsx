import { useNavigate } from 'react-router-dom'

import { Field, FormStep, MultiStepForm } from '@/components/ui'
import { apartmentDetailSchema, buildingSchema, paymentInformationSchema, ROUTES, serviceSchema } from '@/constants'

const ApartmentSetup = () => {
  const navigate = useNavigate()
  //RECHECK : API
  const handleSubmit = (data: any) => {
    console.log(data)
    navigate(ROUTES.overview.path)
  }
  return (
    <div className="flex flex-col items-center justify-center px-4">
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
                  { value: 'unit', label: 'Per Unit' },
                  { value: 'flat', label: 'Flat' },
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
                  { value: 'unit', label: 'Per Unit' },
                  { value: 'flat', label: 'Flat' },
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
    </div>
  )
}

export default ApartmentSetup
