import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
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
  Textarea,
} from '@/components/common'
import { SelectRoomModal } from '@/components/ui'
import { AdhocInvoiceSchema, INVOICE_FORM_FIELDS } from '@/constants'
import {
  ADHOC_INVOICE_CATEGORY,
  ADHOC_INVOICE_PAYMENT_STATUS,
  ADHOC_INVOICE_PRIORITY,
  ADHOC_INVOICE_STATUS,
} from '@/enum/adhocInvoice'
import { type ADHOC_INVOICE_FORM_SCHEMA_TYPE } from '@/types'

type IInvoiceCreateFormProps = {
  buttonLabel: string
  buttonIcon?: React.ReactNode
  onSubmit: (data: ADHOC_INVOICE_FORM_SCHEMA_TYPE) => void | Promise<void>
  isSubmitting?: boolean
}
const InvoiceCreateForm = ({ buttonLabel, buttonIcon, onSubmit, isSubmitting }: IInvoiceCreateFormProps) => {
  const form = useForm<ADHOC_INVOICE_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(AdhocInvoiceSchema),
    defaultValues: {
      unitId: '',
      title: '',
      description: '',
      invoiceDate: '',
      dueDate: '',
      category: ADHOC_INVOICE_CATEGORY.MISCELLANEOUS,
      finalAmount: 100,
      paymentStatus: ADHOC_INVOICE_PAYMENT_STATUS.UNPAID,
      notes: '',
      includeInMonthly: false,
      priority: ADHOC_INVOICE_PRIORITY.NORMAL,
      status: ADHOC_INVOICE_STATUS.ACTIVE,
    },
    mode: 'onChange',
  })

  const isButtonDisabled: boolean = useMemo(
    () => isSubmitting || !form.formState.isDirty || !form.formState.isValid,
    [isSubmitting, form.formState.isDirty, form.formState.isValid],
  )

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Task Detail */}
        {INVOICE_FORM_FIELDS.map(({ title, description, fields }) => (
          <Card key={'form-section' + title + description} className="space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
            <div>
              <h3>{title}</h3>
              <p className="text-theme-secondary">{description}</p>
            </div>
            <div className="space-y-2">
              {fields.map((item, index) => {
                switch (item.fieldType) {
                  case 'select':
                    return (
                      <FormField
                        key={'form-tenant-field' + item.key + index}
                        control={form.control}
                        name={item.key}
                        render={({ field }) => (
                          <div className="space-y-1">
                            <p>{item.label}</p>
                            <Select
                              onValueChange={(val) => {
                                if (val === 'true') field.onChange(true)
                                else if (val === 'false') field.onChange(false)
                                else field.onChange(val)
                              }}
                              defaultValue={String(field.value ?? '')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={item.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {item.options.map((fieldItem, index) => (
                                  <SelectItem
                                    key={'select-value' + fieldItem.value + index}
                                    value={String(fieldItem.value)}
                                  >
                                    {fieldItem.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </div>
                        )}
                      />
                    )
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
                              <InputNumber
                                {...field}
                                value={field.value?.toString() || ''}
                                placeholder={item.placeholder}
                              />
                            ) : item.inputType === 'textarea' ? (
                              <Textarea
                                {...field}
                                value={field.value?.toString() || ''}
                                placeholder={item.placeholder}
                              />
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
                              <Input {...field} value={field.value?.toString() || ''} placeholder={item.placeholder} />
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
                                    <InputNumber
                                      {...field}
                                      value={field.value?.toString() || ''}
                                      placeholder={fieldItem.placeholder}
                                      onChange={(e) => {
                                        const val = e.target.value
                                        field.onChange(val === '' ? undefined : Number(val))
                                      }}
                                    />
                                  ) : fieldItem.inputType === 'textarea' ? (
                                    <Textarea
                                      {...field}
                                      value={field.value?.toString() || ''}
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
                                      {...field}
                                      value={field.value?.toString() || ''}
                                      placeholder={fieldItem.placeholder}
                                    />
                                  )
                                ) : fieldItem.fieldType === 'select' ? (
                                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || ''}>
                                    <SelectTrigger>
                                      <SelectValue placeholder={fieldItem.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fieldItem.options.map((fieldItem, index) => (
                                        <SelectItem
                                          key={'select-value' + fieldItem.value + index}
                                          value={fieldItem.value.toString()}
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
        <Card className="space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
          <div>
            <h3>
              Location <span className="text-theme-error">*</span>
            </h3>
            <p className="text-theme-secondary">Select the room for this adhoc invoice</p>
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
          <Button type="submit" className="flex items-center gap-2" disabled={isButtonDisabled}>
            {isSubmitting ? <Plus /> : buttonLabel}
            {buttonIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default InvoiceCreateForm
