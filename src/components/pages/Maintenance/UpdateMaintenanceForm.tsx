import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
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
import { UPDATE_MAINTENANCE_FORM_FIELDS, UPDATE_MAINTENANCE_FORM_SCHEMA } from '@/constants'
import { MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import type { IUnit, IUpdateMaintenanceFormProps, UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

const UpdateMaintenanceForm = ({
  onSubmit,
  iconLabel,
  buttonLabel,
  defaultValues,
  errorMessage,
  units,
  unitsLoading,
}: IUpdateMaintenanceFormProps) => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(UPDATE_MAINTENANCE_FORM_SCHEMA),
    defaultValues: {
      unitId: undefined,
      title: '',
      description: '',
      status: MAINTENANCE_STATUS.PENDING,
      priority: MAINTENANCE_PRIORITY.NORMAL,
      appointmentDate: '',
      dueDate: '',
      estimatedHours: undefined,
    },
  })

  const initialUnitName = useMemo(() => {
    const dv: any = defaultValues as any
    return dv?.unit?.unitName ?? dv?.unitName ?? undefined
  }, [defaultValues])

  const initialUnitId = useMemo(() => {
    const dv: any = defaultValues as any
    return dv?.unitId ?? dv?.unit?.id ?? undefined
  }, [defaultValues])

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form])

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Task Detail */}
        {UPDATE_MAINTENANCE_FORM_FIELDS.map(({ title, description, fields }) => (
          <Card key={'form-section' + title + description} className="space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
            <div>
              <h3>{title}</h3>
              <p className="text-theme-secondary">{description}</p>
            </div>

            <div className="space-y-2">
              {fields.map((item, index) => {
                if (item.key === 'unitId') {
                  return (
                    <FormField
                      key={'form-maintenance-field' + item.key + index}
                      control={form.control}
                      name={'unitId' as keyof UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE}
                      render={({ field }) => (
                        <div className="space-y-1">
                          <p>{item.label}</p>
                          <Select
                            value={
                              field.value == null || field.value === ''
                                ? initialUnitId != null
                                  ? String(initialUnitId)
                                  : undefined
                                : String(field.value)
                            }
                            onValueChange={(val) => field.onChange(val)}
                            disabled={unitsLoading}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={initialUnitName ?? 'Select Room Number'} />
                            </SelectTrigger>
                            <SelectContent>
                              {units?.map((unit: IUnit) => (
                                <SelectItem key={unit.id} value={String(unit.id)}>
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
                        name={item.key}
                        render={({ field, fieldState }) => (
                          <div className="space-y-1">
                            <p>{item.label}</p>
                            {item.inputType === 'number' ? (
                              <InputNumber
                                decimal={true}
                                maxLength={item.maxLength}
                                {...field}
                                value={field.value as unknown as string | number | undefined}
                                onChange={(e: any) => {
                                  const v = e?.target?.value
                                  field.onChange(v === '' || v == null ? undefined : v)
                                }}
                                placeholder={item.placeholder}
                              />
                            ) : item.inputType === 'textarea' ? (
                              <Textarea
                                {...field}
                                value={field.value == null ? '' : String(field.value)}
                                placeholder={item.placeholder}
                              />
                            ) : item.inputType === 'datetime' ? (
                              <DateTimePicker
                                placeholder={item.placeholder}
                                id={field.name}
                                value={field.value ? new Date(String(field.value)) : undefined}
                                onChange={(val) => field.onChange(val?.toISOString())}
                                onBlur={field.onBlur}
                                name={field.name}
                                error={!!fieldState.error}
                                required
                              />
                            ) : (
                              <Input
                                maxLength={item.maxLength}
                                type={item.type}
                                {...field}
                                value={field.value == null ? '' : String(field.value)}
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
                        key={'form-maintenance-field' + item.key + index}
                        className="desktop:grid-cols-2 grid gap-x-4 gap-y-1"
                      >
                        {item.fields.map((fieldItem, index) => (
                          <FormField
                            key={'form-maintenance-field' + fieldItem.key + index}
                            control={form.control}
                            name={fieldItem.key}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <p>{fieldItem.label}</p>
                                {fieldItem.fieldType === 'input' ? (
                                  fieldItem.inputType === 'number' ? (
                                    <InputNumber
                                      decimal={true}
                                      maxLength={fieldItem.maxLength}
                                      {...field}
                                      value={field.value as unknown as string | number | undefined}
                                      onChange={(e: any) => {
                                        const v = e?.target?.value
                                        field.onChange(v === '' || v == null ? undefined : v)
                                      }}
                                      placeholder={fieldItem.placeholder}
                                    />
                                  ) : fieldItem.inputType === 'textarea' ? (
                                    <Textarea
                                      maxLength={fieldItem.maxLength}
                                      {...field}
                                      value={field.value == null ? '' : String(field.value)}
                                      placeholder={fieldItem.placeholder}
                                    />
                                  ) : fieldItem.inputType === 'datetime' ? (
                                    <DateTimePicker
                                      placeholder={fieldItem.placeholder}
                                      id={field.name}
                                      value={field.value ? new Date(String(field.value)) : undefined}
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
                                      value={field.value == null ? '' : String(field.value)}
                                      placeholder={fieldItem.placeholder}
                                    />
                                  )
                                ) : fieldItem.fieldType === 'select' ? (
                                  <Select
                                    key={`select-${String(field.value ?? '')}`}
                                    onValueChange={field.onChange}
                                    value={field.value == null ? undefined : String(field.value)}
                                  >
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
                  case 'select':
                    return (
                      <FormField
                        key={'form-maintenance-field' + item.key + index}
                        control={form.control}
                        name={item.key}
                        render={({ field }) => (
                          <div className="space-y-1">
                            <p>{item.label}</p>
                            <Select
                              key={`select-${String(field.value ?? '')}`}
                              onValueChange={field.onChange}
                              value={field.value == null ? undefined : String(field.value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={item.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {item.options.map((item, index) => (
                                  <SelectItem key={'select-value' + item.value + index} value={item.value}>
                                    {item.label}
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

export default UpdateMaintenanceForm
