import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Card, Form } from '@/components/common'
import { ApartmentFormField, ApartmentUpload } from '@/components/pages/ApartmentCreate'
import { APARTMENT_FORM_SCHEMA, APARTMENT_FORM_SECTIONS, ROUTES } from '@/constants'
import type { APARTMENT_FORM_FIELD, APARTMENT_FORM_VALUES } from '@/types'

const ApartmentCreateForm = () => {
  const form = useForm<APARTMENT_FORM_VALUES>({
    resolver: zodResolver(APARTMENT_FORM_SCHEMA),
    defaultValues: {
      files: [],
      name: '',
      address: '',
      phone: '',
      taxId: '',
      paymentDueDate: new Date().toISOString(),
      lateFee: '',
    },
  })
  const navigate = useNavigate()
  const onSubmit = (data: APARTMENT_FORM_VALUES) => {
    //implement API
    alert(data)
    navigate(ROUTES.apartmentSetup.path)
  }

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

          <Button type="submit">Save Information</Button>
        </div>
      </form>
    </Form>
  )
}

export default ApartmentCreateForm
