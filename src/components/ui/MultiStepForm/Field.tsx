import { useFormContext } from 'react-hook-form'

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
import type { FieldProps } from '@/types'

import { ListField } from './ListField'
import { ListObjectField } from './ListObjectField'

export const Field = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  description,
  options = [],
  objectFields,
  className = '',
  children,
}: FieldProps) => {
  const { control } = useFormContext()

  // Handle list-object field type
  if (type === 'list-object') {
    return (
      <ListObjectField
        name={name}
        label={label}
        description={description}
        objectFields={objectFields}
        className={className}
      />
    )
  }

  if (type === 'list') {
    return (
      <ListField name={name} label={label} placeholder={placeholder} description={description} className={className} />
    )
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'select' ? (
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === 'textarea' ? (
              <Textarea placeholder={placeholder} {...field} value={field.value || ''} />
            ) : type === 'number' ? (
              <InputNumber placeholder={placeholder} {...field} value={field.value || ''} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} value={field.value || ''} />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {children}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
