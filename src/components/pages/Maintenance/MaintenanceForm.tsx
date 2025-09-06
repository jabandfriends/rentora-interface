import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { MAINTENANCE_FORM_FIELDS, MAINTENANCE_FORM_SCHEMA } from '@/constants'

type MAINTENANCE_FORM_SCHEMA_TYPE = z.infer<typeof MAINTENANCE_FORM_SCHEMA>
const MaintenanceForm = () => {
  const form = useForm<MAINTENANCE_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(MAINTENANCE_FORM_SCHEMA),
    defaultValues: {
      unit_id: '',
      title: '',
      description: '',
      status: '',
      priority: '',
      appointment_date: '',
      due_date: '',
      estimated_hours: '',
    },
  })
  const onSubmit = (data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Task Detail */}
        {MAINTENANCE_FORM_FIELDS.map(({ title, description, fields }) => (
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
                        key={'form-maintenance-field' + item.key + index}
                        control={form.control}
                        name={item.key}
                        render={({ field, fieldState }) => (
                          <div>
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
                  case 'select':
                    return (
                      <FormField
                        key={'form-maintenance-field' + item.key + index}
                        control={form.control}
                        name={item.key}
                        render={({ field }) => (
                          <div>
                            <p>{item.label}</p>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder={item.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {item.options.map((item) => (
                                  <SelectItem value={item.value}>{item.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </div>
                        )}
                      />
                    )
                  case 'layout':
                    return (
                      <div
                        key={'form-maintenance-field' + item.key + index}
                        className="desktop:grid-cols-2 grid gap-x-4"
                      >
                        {item.fields.map((fieldItem, index) => (
                          <FormField
                            key={'form-maintenance-field' + fieldItem.key + index}
                            control={form.control}
                            name={fieldItem.key}
                            render={({ field, fieldState }) => (
                              <div>
                                <p>{fieldItem.label}</p>
                                <DateTimePicker
                                  id={field.name}
                                  onChange={(val) => field.onChange(val?.toISOString())}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  error={!!fieldState.error}
                                  required
                                />
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
            <Plus /> Create a task
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MaintenanceForm
