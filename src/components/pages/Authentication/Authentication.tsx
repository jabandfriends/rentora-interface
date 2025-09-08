import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Card, Form, FormField, FormMessage, Image, Input } from '@/components/common'
import { AUTHENTICATION_FIELDS, AUTHENTICATION_FORM_SCHEMA, ROUTES } from '@/constants'
import type { AUTHENTICATION_FORM_SCHEMA_TYPE } from '@/types'
import { cn } from '@/utilities'

const Authentication = () => {
  const navigate = useNavigate()

  const form = useForm<AUTHENTICATION_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(AUTHENTICATION_FORM_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: AUTHENTICATION_FORM_SCHEMA_TYPE) => {
    alert(data)
    navigate(ROUTES.apartmentCreate.path)
  }

  return (
    <Card className="desktop:size-3/5 desktop:flex-col flex size-4/5 flex-col justify-center gap-y-4 rounded-3xl px-10 py-8 shadow">
      <div className="flex flex-col">
        <h2>Guess Who's Back</h2>
        <p>Let's Get You Signed in</p>
      </div>
      <div className="desktop:flex-row flex w-full flex-col items-center justify-between gap-x-4 gap-y-4">
        <div className="desktop:gap-15 desktop:w-1/2 flex w-full flex-col gap-x-6 rounded-3xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-5 rounded-3xl px-5 py-5 shadow"
            >
              {AUTHENTICATION_FIELDS.map(({ key, label, placeholder, type }) => (
                <FormField
                  control={form.control}
                  name={key}
                  render={({ field, fieldState }) => (
                    <div className="w-full">
                      <p className="font-semibold">{label}</p>
                      <Input
                        className={cn(fieldState.error && 'border-theme-error')}
                        placeholder={placeholder}
                        type={type}
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              ))}

              <Button block>Login</Button>
            </form>
          </Form>
        </div>
        <div>
          <Image
            className="desktop:h-64 rounded-xl object-cover"
            src="https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA="
            alt="building photo"
          />
        </div>
      </div>
    </Card>
  )
}

export default Authentication
