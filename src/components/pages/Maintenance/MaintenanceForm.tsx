import { zodResolver } from '@hookform/resolvers/zod'
import { type ReactNode, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  DateTimePicker,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { Switch } from '@/components/feature'
import { SelectRoomModal } from '@/components/ui'
import { MAINTENANCE_FORM_FIELDS, MAINTENANCE_FORM_SCHEMA } from '@/constants'
import { MAINTENANCE_CATEGORY, MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import type { IMaintenanceDetail, MAINTENANCE_FORM_SCHEMA_TYPE, Maybe } from '@/types'

type IMaintenanceFormProps = {
  buttonLabel: string
  buttonIcon?: ReactNode
  onSubmit: (data: MAINTENANCE_FORM_SCHEMA_TYPE) => void | Promise<void>
  isSubmitting: boolean
  defaultValues?: Maybe<IMaintenanceDetail>
}

const MaintenanceForm = ({ buttonLabel, buttonIcon, onSubmit, isSubmitting, defaultValues }: IMaintenanceFormProps) => {
  const form = useForm<MAINTENANCE_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(MAINTENANCE_FORM_SCHEMA),
    defaultValues: {
      unitId: '',
      title: '',
      description: '',
      status: MAINTENANCE_STATUS.PENDING,
      priority: MAINTENANCE_PRIORITY.NORMAL,
      appointmentDate: '',
      dueDate: '',
      estimatedHours: undefined,
      estimatedCost: undefined,
      category: MAINTENANCE_CATEGORY.GENERAL,
      isEmergency: false,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        unitId: defaultValues.unitId,
        title: defaultValues.title,
        description: defaultValues.description,
        status: defaultValues.status,
        priority: defaultValues.priority,
        appointmentDate: defaultValues.appointmentDate,
        dueDate: defaultValues.dueDate || '',
        estimatedHours: defaultValues.estimatedHours?.toString(),
        category: defaultValues.category,
        estimatedCost: defaultValues.estimatedCost?.toString(),
        isEmergency: defaultValues.isEmergency,
      })
    }
  }, [defaultValues, form])

  const isButtonDisabled: boolean = useMemo(
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
                switch (item.fieldType) {
                  case 'switch':
                    return (
                      <FormField
                        key={'form-maintenance-switch' + item.key + index + item.fieldType}
                        name={item.key}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="border-theme-secondary-300 flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">{item.label}</FormLabel>
                              <FormDescription>{item.description}</FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                id={field.name}
                                onBlur={field.onBlur}
                                checked={Boolean(field.value)}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  case 'input':
                    return (
                      <FormField
                        key={'form-maintenance-field' + item.key + index}
                        control={form.control}
                        name={item.key}
                        render={({ field, fieldState }) => (
                          <div className="space-y-1">
                            <p>
                              {item.label} {item.isRequired && <span className="text-theme-error">*</span>}
                            </p>

                            {item.inputType === 'number' ? (
                              <InputNumber
                                maxLength={item.maxLength}
                                {...field}
                                value={field.value?.toString()}
                                placeholder={item.placeholder}
                              />
                            ) : item.inputType === 'textarea' ? (
                              <Textarea
                                maxLength={item.maxLength}
                                {...field}
                                value={field.value?.toString()}
                                placeholder={item.placeholder}
                              />
                            ) : item.inputType === 'datetime' ? (
                              <DateTimePicker
                                id={field.name}
                                value={field.value ? new Date(field.value as string) : undefined}
                                onChange={(val) => field.onChange(val?.toISOString() ?? '')}
                                onBlur={field.onBlur}
                                name={field.name}
                                error={!!fieldState.error}
                                required
                              />
                            ) : (
                              <Input
                                maxLength={item.maxLength}
                                {...field}
                                value={field.value?.toString()}
                                placeholder={item.placeholder}
                              />
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
                            <p>
                              {item.label} {item.isRequired && <span className="text-theme-error">*</span>}
                            </p>
                            <Select onValueChange={field.onChange} value={(field.value as string) ?? ''}>
                              <SelectTrigger className="capitalize">
                                <SelectValue placeholder={item.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {item.options.map((opt, i) => (
                                  <SelectItem
                                    className="capitalize"
                                    key={'select-value' + opt.value + i}
                                    value={opt.value}
                                  >
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
                        {item.fields.map((fieldItem, i2) => {
                          return (
                            <FormField
                              key={'form-maintenance-field' + fieldItem.key + i2}
                              control={form.control}
                              name={fieldItem.key}
                              render={({ field, fieldState }) => (
                                <div className="space-y-1">
                                  <p>
                                    {fieldItem.label}{' '}
                                    {fieldItem.isRequired && <span className="text-theme-error">*</span>}
                                  </p>
                                  <DateTimePicker
                                    id={field.name}
                                    value={field.value ? new Date(field.value as string) : undefined}
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
                          )
                        })}
                      </div>
                    )
                }
              })}
            </div>
          </Card>
        ))}

        {/* Location */}
        <Card className="space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
          <div>
            <h3>
              Location <span className="text-theme-error">*</span>
            </h3>
            <p className="text-theme-secondary">Select the room where this task should be completed</p>
          </div>
          <FormField
            control={form.control}
            name="unitId"
            render={({ field }) => (
              <div className="space-y-1">
                <SelectRoomModal onRoomSelect={field.onChange} selectedRoomId={field.value} />
                <FormMessage />
              </div>
            )}
          />
        </Card>

        <div className="flex justify-end">
          <Button className="flex items-center gap-2" type="submit" disabled={isButtonDisabled}>
            {isSubmitting ? <Spinner /> : buttonLabel}
            {buttonIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MaintenanceForm
