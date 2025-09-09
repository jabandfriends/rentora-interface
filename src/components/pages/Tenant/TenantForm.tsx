import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  DateTimePicker,
  Form,
  FormField,
  FormMessage,
  Input,
  InputNumber,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/common'
import { TENANT_FORM_FIELDS, TENANT_FORM_SCHEMA } from '@/constants'
import type { ITenantFormProps, TENANT_FORM_SCHEMA_TYPE } from '@/types'

const TenantForm = ({ onSubmit }: ITenantFormProps) => {
  const form = useForm<TENANT_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(TENANT_FORM_SCHEMA),
    defaultValues: {
      full_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      phone: '',
      national_id: '',
      birth_date: '',
      floor: '',
      unit_id: '',
    },
  })
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Task Detail */}
        {TENANT_FORM_FIELDS.map(({ title, description, fields }) => (
          <Card key={'form-section' + title + description} className="space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
            <div>
              <h3>{title}</h3>
              <p className="text-theme-secondary">{description}</p>
            </div>
            <div className="space-y-2">
              {fields.map((item, index) => {
                switch (item.fieldType) {
                  case 'input':
                    return (
                      <FormField
                        key={'form-tenant-field' + item.key + index}
                        control={form.control}
                        name={item.key}
                        render={({ field, fieldState }) => (
                          <div className="space-y-1">
                            <p>{item.label}</p>
                            {item.inputType === 'number' ? (
                              <InputNumber {...field} placeholder={item.placeholder} />
                            ) : item.inputType === 'textarea' ? (
                              <Textarea {...field} placeholder={item.placeholder} />
                            ) : item.inputType === 'datetime' ? (
                              <DateTimePicker
                                id={field.name}
                                onChange={(val) => field.onChange(val?.toISOString())}
                                onBlur={field.onBlur}
                                name={field.name}
                                error={!!fieldState.error}
                                required
                              />
                            ) : (
                              <Input {...field} placeholder={item.placeholder} />
                            )}
                            <FormMessage />
                          </div>
                        )}
                      />
                    )
                  case 'layout':
                    return (
                      <div
                        key={'form-tenant-field' + item.key + index}
                        className="desktop:grid-cols-2 grid gap-x-4 gap-y-1"
                      >
                        {item.fields.map((fieldItem, index) => (
                          <FormField
                            key={'form-tenant-field' + fieldItem.key + index}
                            control={form.control}
                            name={fieldItem.key}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <p>{fieldItem.label}</p>
                                {fieldItem.fieldType === 'input' ? (
                                  fieldItem.inputType === 'number' ? (
                                    <InputNumber {...field} placeholder={fieldItem.placeholder} />
                                  ) : fieldItem.inputType === 'textarea' ? (
                                    <Textarea {...field} placeholder={fieldItem.placeholder} />
                                  ) : fieldItem.inputType === 'datetime' ? (
                                    <DateTimePicker
                                      id={field.name}
                                      onChange={(val) => field.onChange(val?.toISOString())}
                                      onBlur={field.onBlur}
                                      name={field.name}
                                      error={!!fieldState.error}
                                      required
                                    />
                                  ) : (
                                    <Input {...field} placeholder={fieldItem.placeholder} />
                                  )
                                ) : fieldItem.fieldType === 'select' ? (
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder={fieldItem.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fieldItem.options.map((fieldItem, index) => (
                                        <SelectItem
                                          key={'select-value' + fieldItem.value + index}
                                          value={fieldItem.value}
                                        >
                                          {fieldItem.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : null}
                                <FormMessage />
                              </div>
                            )}
                          />
                        ))}
                      </div>
                    )
                }
              })}
            </div>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button className="flex items-center gap-2" type="submit">
            <Plus /> Create a tenant
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TenantForm
