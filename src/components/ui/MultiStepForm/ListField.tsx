import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/common'
import type { IListFieldProps } from '@/types'

interface ListItem extends Record<string, unknown> {
  value: string
  id: string
}

export const ListField = ({
  name,
  label,
  placeholder = 'Enter item',
  description,
  className = '',
}: IListFieldProps) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as any,
  })
  const [inputValue, setInputValue] = useState<string>('')

  const addValue = (): void => {
    if (inputValue.trim()) {
      // Check for duplicates
      const isDuplicate = fields.some((field) => (field as ListItem).value === inputValue.trim())
      if (!isDuplicate) {
        append({ value: inputValue.trim() })
        setInputValue('')
      }
    }
  }

  const removeValue = (valueToRemove: string): void => {
    const index = fields.findIndex((field) => (field as ListItem).value === valueToRemove)
    if (index !== -1) {
      remove(index)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addValue()
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Button
                  variant="outline"
                  onClick={addValue}
                  disabled={!inputValue.trim() || fields.some((f) => (f as ListItem).value === inputValue.trim())}
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              {fields.length > 0 && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {fields.map((field) => (
                      <div key={field.id} className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                        {(field as ListItem).value}
                        <Button
                          variant="ghost"
                          onClick={() => removeValue((field as ListItem).value)}
                          className="hover:bg-theme-primary/20 h-auto rounded-full p-0.5"
                          aria-label={`Remove ${(field as ListItem).value}`}
                        >
                          <X className="size-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <p className="text-body-3 text-theme-secondary">
                    {fields.length} item{fields.length !== 1 ? 's' : ''} added
                  </p>
                </div>
              )}
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
