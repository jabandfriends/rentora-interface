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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/common'
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
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea {...field} placeholder={props.placeholder} />
            ) : type === 'number' ? (
              <InputNumber {...field} {...props} />
            ) : type === 'select' ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {props.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
