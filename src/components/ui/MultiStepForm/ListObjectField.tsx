import { Plus, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import {
  Button,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputNumber,
  Label,
} from '@/components/common'
import type { IListObjectField } from '@/types'
import { cn } from '@/utilities'

export const ListObjectField = ({
  name,
  label,
  description,
  objectFields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', required: true },
    { name: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', required: true },
  ],
  className = '',
}: IListObjectField) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })
  const [objectInputs, setObjectInputs] = useState<Record<string, string>>({})
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({})

  const addObject = useCallback(() => {
    // Validate required fields
    const newInputErrors: Record<string, string> = {}
    objectFields.forEach((objField) => {
      if (objField.required && !objectInputs[objField.name]?.trim()) {
        newInputErrors[objField.name] = `${objField.label} is required`
      }
    })

    if (Object.keys(newInputErrors).length > 0) {
      setInputErrors(newInputErrors)
      return
    }

    setInputErrors({})

    const newObject: Record<string, any> = {}
    objectFields.forEach((objField) => {
      const value = objectInputs[objField.name]?.trim() || ''
      newObject[objField.name] = objField.type === 'number' ? parseFloat(value) || 0 : value
    })

    const isDuplicate = fields.some((existingItem) => JSON.stringify(existingItem) === JSON.stringify(newObject))

    if (!isDuplicate) {
      append(newObject)
      setObjectInputs({})
    }
  }, [objectInputs, fields, append, objectFields])

  const removeObject = useCallback(
    (indexToRemove: number): void => {
      remove(indexToRemove)
    },
    [remove],
  )

  const updateObjectInput = useCallback(
    (fieldName: string, value: string): void => {
      setObjectInputs((prev) => ({ ...prev, [fieldName]: value }))
      if (inputErrors[fieldName]) {
        setInputErrors((prev) => ({ ...prev, [fieldName]: '' }))
      }
    },
    [inputErrors],
  )

  const canAdd: boolean = useMemo(
    () => objectFields.filter((f) => f.required).every((objField) => objectInputs[objField.name]?.trim()),
    [objectFields, objectInputs],
  )

  return (
    <FormField
      control={control}
      name={name}
      render={() => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <div className="space-y-3">
              {fields.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {fields.map((item: Record<string, any>, index: number) => (
                    <div
                      key={index}
                      className="bg-theme-primary-100 flex w-full items-center gap-3 rounded-lg px-2 py-2"
                    >
                      <div className="flex w-full gap-2">
                        {objectFields.map((objField) => (
                          <span key={objField.name} className="text-body-2">
                            <span className="font-medium">{objField.label}:</span>
                            <span className="text-theme-primary">
                              {objField.type === 'number' && typeof item[objField.name] === 'number'
                                ? item[objField.name].toFixed(2)
                                : item[objField.name]}
                            </span>
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeObject(index)}
                        className="hover:bg-theme-primary/20 text-theme-primary h-auto rounded-full p-1"
                        aria-label={`Remove item ${index + 1}`}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-4">
                <div className="desktop:grid-cols-2 grid gap-4">
                  {objectFields.map((objField) => (
                    <div key={objField.name} className="w-full space-y-2">
                      <Label htmlFor={`${name}-${objField.name}`} className="text-body-2 font-semibold">
                        {objField.label}
                        {objField.required && <span className="text-theme-error ml-1">*</span>}
                      </Label>
                      {objField.type === 'number' ? (
                        <InputNumber
                          decimal
                          id={`${name}-${objField.name}`}
                          placeholder={objField.placeholder}
                          value={objectInputs[objField.name] || ''}
                          onChange={(e) => updateObjectInput(objField.name, e.target.value)}
                          className={cn(inputErrors[objField.name] ? 'border-theme-error' : '')}
                        />
                      ) : (
                        <Input
                          id={`${name}-${objField.name}`}
                          type={objField.type || 'text'}
                          placeholder={objField.placeholder}
                          value={objectInputs[objField.name] || ''}
                          onChange={(e) => updateObjectInput(objField.name, e.target.value)}
                          className={cn(inputErrors[objField.name] ? 'border-theme-error' : '')}
                        />
                      )}
                      {inputErrors[objField.name] && (
                        <p className="text-theme-error text-body-2">{inputErrors[objField.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
                <FormMessage />
                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center" onClick={addObject} disabled={!canAdd}>
                    <Plus className="size-4" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        )
      }}
    />
  )
}
