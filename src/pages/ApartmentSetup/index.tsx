import { z } from 'zod'

import { Field, FormStep, MultiStepForm } from '@/components/ui'

const ApartmentSetup = () => {
  const stepOneSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    skills: z.array(z.string()).min(1, 'At least one skill required'),
  })

  const handleSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <MultiStepForm onSubmit={handleSubmit} title="User Registration">
        <FormStep value="0" title="Personal Info" schema={stepOneSchema}>
          <Field name="name" label="Full Name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="skills" label="Skills" type="list" />
        </FormStep>

        <FormStep value="1" title="Preferences">
          <Field name="preferences" label="Preferences" type="list-object" />
        </FormStep>
      </MultiStepForm>
    </div>
  )
}

export default ApartmentSetup
