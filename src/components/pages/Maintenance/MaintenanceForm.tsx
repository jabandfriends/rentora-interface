import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
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
  Spinner,
  Textarea,
} from '@/components/common'
import { SelectRoomModal } from '@/components/ui'
import { MAINTENANCE_FORM_FIELDS, MAINTENANCE_FORM_SCHEMA } from '@/constants'
import type { IUnit, MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

type Props = {
  buttonLabel: string
  buttonIcon?: React.ReactNode
  onSubmit: (data: MAINTENANCE_FORM_SCHEMA_TYPE) => void | Promise<void>
  isSubmitting?: boolean
  units?: Array<IUnit>
  unitsLoading?: boolean
}

const MaintenanceForm = ({ buttonLabel, buttonIcon, onSubmit, isSubmitting, units, unitsLoading }: Props) => {
  const form = useForm<MAINTENANCE_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(MAINTENANCE_FORM_SCHEMA),
    defaultValues: {
      unit_id: '',
      title: '',
      description: '',
      status: 'pending',
      priority: 'normal',
      appointment_date: '',
      due_date: '',
      estimated_hours: '',
    },
    mode: 'onChange',
  })

  const isButtonDisabled = useMemo(
    () => isSubmitting || !form.formState.isDirty || !form.formState.isValid,
    [isSubmitting, form.formState.isDirty, form.formState.isValid],
  )

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {MAINTENANCE_FORM_FIELDS.map(({ title, description, fields }) => (
          <Card key={'form-section' + title + description} className="space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
            <div>
              <h3>{title}</h3>
              <p className="text-theme-secondary">{description}</p>
            </div>

            <div className="space-y-2">
              {fields.map((item, index) => {
                if (item.key === 'unit_id') {
                  return (
                    <FormField
                      key={'form-maintenance-field' + item.key + index}
                      control={form.control}
                      name={item.key as keyof MAINTENANCE_FORM_SCHEMA_TYPE}
                      render={({ field }) => (
                        <div className="space-y-1">
                          <p>{item.label}</p>
                          <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={unitsLoading}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Room Number" />
                            </SelectTrigger>
                            <SelectContent>
                              {units?.map((unit: IUnit) => (
                                <SelectItem key={unit.id} value={unit.id}>
                                  {unit.unitName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      )}
                    />
                  )
                }
                switch (item.fieldType) {
                  case 'input':
                    return (
                      <FormField
                        key={'form-maintenance-field' + item.key + index}
                        control={form.control}
                        name={item.key as keyof MAINTENANCE_FORM_SCHEMA_TYPE}
                        render={({ field, fieldState }) => (
                          <div className="space-y-1">
                            <p>{item.label}</p>

                            {item.inputType === 'number' ? (
                              <InputNumber maxLength={item.maxLength} {...field} placeholder={item.placeholder} />
                            ) : item.inputType === 'textarea' ? (
                              <Textarea maxLength={item.maxLength} {...field} placeholder={item.placeholder} />
                            ) : item.inputType === 'datetime' ? (
                              <DateTimePicker
                                id={field.name}
                                onChange={(val) => field.onChange(val?.toISOString() ?? '')}
                                onBlur={field.onBlur}
                                name={field.name}
                                error={!!fieldState.error}
                                required
                              />
                            ) : (
                              <Input maxLength={item.maxLength} {...field} placeholder={item.placeholder} />
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
                        name={item.key as keyof MAINTENANCE_FORM_SCHEMA_TYPE}
                        render={({ field }) => (
                          <div className="space-y-1">
                            <p>{item.label}</p>
                            <Select onValueChange={field.onChange} value={(field.value as string) ?? ''}>
                              <SelectTrigger>
                                <SelectValue placeholder={item.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {item.options.map((opt, i) => (
                                  <SelectItem key={'select-value' + opt.value + i} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
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
                        className="desktop:grid-cols-2 grid gap-x-4 gap-y-1"
                      >
                        {item.fields.map((fieldItem, i2) => (
                          <FormField
                            key={'form-maintenance-field' + fieldItem.key + i2}
                            control={form.control}
                            name={fieldItem.key as keyof MAINTENANCE_FORM_SCHEMA_TYPE}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <p>{fieldItem.label}</p>
                                <DateTimePicker
                                  id={field.name}
                                  onChange={(val) => field.onChange(val?.toISOString() ?? '')}
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

        {/* Location */}
        <Card>
          <div>
            <h3>Location</h3>
            <p>Select the room where this task should be completed</p>
          </div>
          <FormField
            control={form.control}
            name="unit_id"
            render={({ field }) => (
              <div className="space-y-1">
                <SelectRoomModal onRoomSelect={field.onChange} selectedRoomId={field.value} />
                <FormMessage />
              </div>
            )}
          />
        </Card>

        <div className="flex justify-end">
          <Button className="flex items-center gap-2" disabled={isButtonDisabled} type="submit">
            {isSubmitting ? <Spinner /> : buttonLabel}
            {buttonIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MaintenanceForm
