import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

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
import { MAINTENANCE_FORM_FIELDS, MAINTENANCE_FORM_SCHEMA, ROUTES } from '@/constants'
import type { Priority, Status } from '@/enum'
import { useRentoraApiUnitList } from '@/hooks'
import { useRentoraApiCreateMaintenance } from '@/hooks/api/execute/useRentoraApiCreateMaintenance'
import type { ICreateMaintenanceRequestPayload, IUnit, MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const MaintenanceForm = ({
  buttonLabel,
  buttonIcon,
}: {
  buttonLabel: string
  buttonIcon?: React.ReactNode
  onSubmit?: (data: MAINTENANCE_FORM_SCHEMA_TYPE) => void | Promise<void>
}) => {
  // ใช้ type จาก Zod schema โดยตรง
  const form = useForm<MAINTENANCE_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(MAINTENANCE_FORM_SCHEMA),
    defaultValues: {
      unit_id: '',
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      appointment_date: '',
      due_date: '',
      estimated_hours: '',
    },
    mode: 'onChange',
  })

  const navigate: NavigateFunction = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: unitList = [], isLoading: unitsLoading } = useRentoraApiUnitList({
    apartmentId: apartmentId ?? '',
    params: { page: 0, size: 50, search: '', sortBy: undefined, sortDir: undefined, status: undefined },
  })
  const { mutateAsync: createMaintenance, isPending } = useRentoraApiCreateMaintenance()

  const isButtonDisabled = useMemo(
    () => isPending || !form.formState.isDirty || !form.formState.isValid,
    [isPending, form.formState.isDirty, form.formState.isValid],
  )

  const handleFormSubmit = useCallback(
    async (data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
      const dataPayload: ICreateMaintenanceRequestPayload = {
        unitId: data.unit_id,
        title: data.title,
        description: data.description,
        status: data.status as Status,
        priority: data.priority as Priority,
        appointmentDate: data.appointment_date,
        dueDate: data.due_date!,
        estimatedHours: Number(data.estimated_hours),
      }

      try {
        await createMaintenance({
          apartmentId: apartmentId ?? '',
          payload: dataPayload,
        })

        toast.success('Create maintenance successfully')
        navigate(ROUTES.maintenance.getPath(apartmentId ?? ''))
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [apartmentId, createMaintenance, navigate],
  )

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleFormSubmit)}>
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
                              {unitList?.map((unit: IUnit) => (
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
                              // ถ้า InputNumber คืน string ให้ปล่อยผ่าน แล้วค่อย Number() ตอน submit
                              <InputNumber {...field} placeholder={item.placeholder} />
                            ) : item.inputType === 'textarea' ? (
                              <Textarea {...field} placeholder={item.placeholder} />
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

        <div className="flex justify-end">
          <Button className="flex items-center gap-2" disabled={isButtonDisabled} type="submit">
            {isPending ? <Spinner /> : buttonLabel}
            {buttonIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MaintenanceForm
