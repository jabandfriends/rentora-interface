import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  DateTimePicker,
  Form,
  FormControl,
  FormField,
  FormMessage,
  Input,
  InputNumber,
  Popover,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/common'
import { Calendar } from '@/components/ui'
import { USER_FORM_FIELDS, USER_FORM_SCHEMA } from '@/constants'
import type { IUserFormProps, USER_FORM_SCHEMA_TYPE } from '@/types'

const AccountForm = ({ onSubmit, iconLabel, buttonLabel, defaultValues, errorMessage }: IUserFormProps) => {
  const form = useForm<USER_FORM_SCHEMA_TYPE>({
    mode: 'onChange',
    resolver: zodResolver(USER_FORM_SCHEMA),
  })
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form])

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Task Detail */}
        {USER_FORM_FIELDS.map(({ title, description, fields }) => (
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
                        key={'form-user-field' + item.key + index}
                        control={form.control}
                        name={item.key}
                        render={({ field, fieldState }) => (
                          <div className="space-y-1">
                            <p>{item.label}</p>
                            {item.inputType === 'number' ? (
                              <InputNumber
                                maxLength={item.maxLength}
                                {...field}
                                value={field.value ?? ''}
                                placeholder={item.placeholder}
                              />
                            ) : item.inputType === 'textarea' ? (
                              <Textarea {...field} value={field.value ?? ''} placeholder={item.placeholder} />
                            ) : item.inputType === 'datetime' ? (
                              <DateTimePicker
                                id={field.name}
                                onChange={(val) => field.onChange(val?.toISOString())}
                                onBlur={field.onBlur}
                                name={field.name}
                                error={!!fieldState.error}
                                required
                              />
                            ) : item.inputType === 'date' ? (
                              <FormControl>
                                <Popover
                                  trigger={
                                    <Button
                                      block
                                      variant="outlineSecondary"
                                      className="flex items-center justify-start"
                                    >
                                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                      <CalendarIcon className="h-4 w-4" />
                                    </Button>
                                  }
                                >
                                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                  <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(val) => field.onChange(val?.toISOString())}
                                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                    captionLayout="dropdown"
                                  />
                                </Popover>
                              </FormControl>
                            ) : (
                              <Input
                                maxLength={item.maxLength}
                                type={item.type}
                                {...field}
                                value={field.value ?? ''}
                                placeholder={item.placeholder}
                              />
                            )}
                            <FormMessage />
                          </div>
                        )}
                      />
                    )
                  case 'layout':
                    return (
                      <div
                        key={'form-user-field' + item.key + index}
                        className="desktop:grid-cols-2 grid gap-x-4 gap-y-1"
                      >
                        {item.fields.map((fieldItem, index) => (
                          <FormField
                            key={'form-user-field' + fieldItem.key + index}
                            control={form.control}
                            name={fieldItem.key}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <p>{fieldItem.label}</p>
                                {fieldItem.fieldType === 'input' ? (
                                  fieldItem.inputType === 'number' ? (
                                    <InputNumber
                                      maxLength={fieldItem.maxLength}
                                      {...field}
                                      value={field.value ?? ''}
                                      placeholder={fieldItem.placeholder}
                                    />
                                  ) : fieldItem.inputType === 'textarea' ? (
                                    <Textarea
                                      maxLength={fieldItem.maxLength}
                                      {...field}
                                      value={field.value ?? ''}
                                      placeholder={fieldItem.placeholder}
                                    />
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
                                    <Input
                                      maxLength={fieldItem.maxLength}
                                      {...field}
                                      value={field.value ?? ''}
                                      placeholder={fieldItem.placeholder}
                                    />
                                  )
                                ) : fieldItem.fieldType === 'select' ? (
                                  <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
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
              {errorMessage && <p className="text-body-2 text-theme-error">{errorMessage}</p>}
            </div>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button className="flex items-center gap-2" type="submit">
            {iconLabel} {buttonLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AccountForm
