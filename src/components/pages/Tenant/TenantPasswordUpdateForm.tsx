import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, Form, FormField, FormLabel, FormMessage, Input } from '@/components/common'
import { TENANT_PASSWORD_UPDATE_FORM, TENANT_PASSWORD_UPDATE_SCHEMA } from '@/constants'
import type { TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA } from '@/types'

type ITenantPasswordUpdateProps = {
  onSubmit: (data: TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA) => void
  isPending: boolean
  errorMessage: string
}

const TenantPasswordUpdateForm = ({ onSubmit, isPending, errorMessage }: ITenantPasswordUpdateProps) => {
  const form = useForm<TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA>({
    mode: 'onChange',
    resolver: zodResolver(TENANT_PASSWORD_UPDATE_SCHEMA),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const isButtonDisabled = useMemo(() => {
    return form.formState.isSubmitting || !form.formState.isDirty || isPending || !form.formState.isValid
  }, [form.formState.isSubmitting, form.formState.isDirty, isPending, form.formState.isValid])
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {TENANT_PASSWORD_UPDATE_FORM.map(({ title, description, fields }) => (
          <Card className="rounded-2xl" key={'form-section' + title + description}>
            <div>
              <h3>{title}</h3>
              <p className="text-theme-secondary">{description}</p>
            </div>
            <div className="space-y-2">
              {fields.map((item, index) => {
                return (
                  <FormField
                    key={'form-tenanct-password-field' + item.key + index}
                    control={form.control}
                    name={item.key}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <FormLabel>{item.label}</FormLabel>
                        <Input {...field} type="password" placeholder={item.placeholder} />
                        <FormMessage />
                      </div>
                    )}
                  />
                )
              })}
            </div>
            {errorMessage && <p className="text-body-2 text-theme-error">{errorMessage}</p>}
          </Card>
        ))}

        <div className="flex justify-end">
          <Button className="flex items-center gap-2" type="submit" disabled={isButtonDisabled}>
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default TenantPasswordUpdateForm
