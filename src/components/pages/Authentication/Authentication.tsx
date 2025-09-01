import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Checkbox, Form, FormField, FormMessage, Input } from '@/components/common'
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
      acceptTerms: undefined,
    },
  })

  const onSubmit = (data: AUTHENTICATION_FORM_SCHEMA_TYPE) => {
    console.log(data)
    navigate(ROUTES.apartmentCreate.path)
  }

  return (
    <div className="bg-theme-light gap-x-25 flex size-3/5 flex-row items-center justify-center rounded-3xl shadow">
      <div className="gap-15 flex w-1/2 flex-col rounded-3xl px-10 py-5">
        <div className="flex flex-col">
          <h2>Guess Who's Back</h2>
          <p>Let's Get You Signed in</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-5 rounded-3xl px-5 py-5 shadow"
          >
            {AUTHENTICATION_FIELDS.map(({ key, label, placeholder, type }) => (
              <FormField
                control={form.control}
                name={key}
                render={({ field }) => (
                  <div className="w-full">
                    <p className="font-semibold">{label}</p>
                    <Input placeholder={placeholder} type={type} {...field} />
                    <FormMessage />
                  </div>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field, fieldState }) => (
                <div className="flex flex-col items-center justify-center gap-x-2">
                  <div className="flex items-center gap-x-2">
                    <Checkbox
                      className={cn(fieldState.error && 'border-theme-error text-theme-error bg-theme-error-100')}
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                    <p className={cn('text-body-3 font-normal', fieldState.error && 'text-theme-error')}>
                      I agree to the terms and policy
                    </p>
                  </div>
                  {/* <FormMessage /> */}
                </div>
              )}
            />
            <Button className="bg-theme-light text-theme-night border-none font-semibold shadow" block>
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <img
          className="h-50 w-80 rounded-xl"
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="building photo"
        />
      </div>
    </div>
  )
}

export default Authentication
