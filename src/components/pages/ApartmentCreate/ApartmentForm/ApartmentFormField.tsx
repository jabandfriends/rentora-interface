import type { Control } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputNumber,
  Textarea,
} from '@/components/common'
import { DateTimePicker } from '@/components/common/DateTimePicker'
import type { APARTMENT_FORM_FIELD, APARTMENT_FORM_FIELD_KEY, APARTMENT_FORM_VALUES } from '@/types'

type IApartmentFormFieldProps = {
  control: Control<APARTMENT_FORM_VALUES, any>
  fieldKey: APARTMENT_FORM_FIELD_KEY
} & Omit<APARTMENT_FORM_FIELD, 'key'>

const ApartmentFormField = ({ control, fieldKey, label, description, type, ...props }: IApartmentFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={fieldKey}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'date' ? (
              <DateTimePicker
                id={field.name}
                onChange={(val) => field.onChange(val?.toISOString())}
                onBlur={field.onBlur}
                name={field.name}
                error={!!fieldState.error}
                required
              />
            ) : type === 'textarea' ? (
              <Textarea {...field} placeholder={props.placeholder} />
            ) : type === 'number' ? (
              <InputNumber {...field} {...props} />
            ) : (
              <Input {...field} type={type} {...props} />
            )}
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ApartmentFormField
