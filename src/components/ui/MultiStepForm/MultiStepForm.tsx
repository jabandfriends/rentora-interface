import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import React, {
  createContext,
  isValidElement,
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FormProvider, useForm, useFormContext as useRHFContext } from 'react-hook-form'
import { z } from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/common'

// Types
interface FormContextType {
  currentStep: number
  totalSteps: number
  allStepData: Record<string, any>
  isSubmitting: boolean
  completedSteps: Set<number>
  nextStep: () => Promise<void>
  prevStep: () => void
  submitForm: () => Promise<void>
}

interface FormStepProps {
  value: string
  title?: string
  description?: string
  schema?: z.ZodSchema
  children: React.ReactNode
}

interface FieldProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  description?: string
  options?: Array<{ value: string; label: string }>
  objectFields?: Array<{
    name: string
    label: string
    type: string
    placeholder?: string
    required?: boolean
  }>
  className?: string
  children?: React.ReactNode
}

interface MultiStepFormProps {
  children: React.ReactNode
  onSubmit?: (data: Record<string, any>) => Promise<void> | void
  onStepSubmit?: (data: Record<string, any>, stepIndex: number) => Promise<void> | void
  submitMode?: 'batch' | 'individual'
  title?: string
  className?: string
}

// Context
const FormContext = createContext<FormContextType | null>(null)

const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('Form components must be used within MultiStepForm')
  }
  return context
}

// Progress Component
const Progress = ({ value, className = '' }: { value: number; className?: string }) => (
  <div className={`bg-secondary h-2 w-full rounded-full ${className}`}>
    <div
      className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
)

// List Field Component
const ListField = ({
  name,
  label,
  placeholder = 'Enter item',
  description,
  className = '',
}: {
  name: string
  label: string
  placeholder?: string
  description?: string
  className?: string
}) => {
  const { control } = useRHFContext()
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const values: Array<string> = field.value || []

        const addValue = (): void => {
          if (inputValue.trim() && !values.includes(inputValue.trim())) {
            const newValues = [...values, inputValue.trim()]
            field.onChange(newValues)
            setInputValue('')
          }
        }

        const removeValue = (valueToRemove: string): void => {
          const newValues = values.filter((value: string) => value !== valueToRemove)
          field.onChange(newValues)
        }

        const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
          if (e.key === 'Enter') {
            e.preventDefault()
            addValue()
          }
        }

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addValue}
                  disabled={!inputValue.trim() || values.includes(inputValue.trim())}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {values.length > 0 && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {values.map((value: string, index: number) => (
                      <div
                        key={index}
                        className="bg-primary/10 text-primary border-primary/20 flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
                      >
                        <span>{value}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeValue(value)}
                          className="hover:bg-primary/20 h-auto rounded-full p-0.5"
                          aria-label={`Remove ${value}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {values.length} item{values.length !== 1 ? 's' : ''} added
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

// List Object Field Component
const ListObjectField = ({
  name,
  label,
  description,
  objectFields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', required: true },
    { name: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', required: true },
  ],
  className = '',
}: {
  name: string
  label: string
  description?: string
  objectFields?: Array<{
    name: string
    label: string
    type: string
    placeholder?: string
    required?: boolean
  }>
  className?: string
}) => {
  const { control } = useRHFContext()
  const [objectInputs, setObjectInputs] = useState<Record<string, string>>({})
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({})

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const values: Array<Record<string, any>> = field.value || []

        const addObject = (): void => {
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

          const isDuplicate = values.some((existingItem) => JSON.stringify(existingItem) === JSON.stringify(newObject))

          if (!isDuplicate) {
            const newValues = [...values, newObject]
            field.onChange(newValues)
            setObjectInputs({})
          }
        }

        const removeObject = (indexToRemove: number): void => {
          const newValues = values.filter((_, index) => index !== indexToRemove)
          field.onChange(newValues)
        }

        const updateObjectInput = (fieldName: string, value: string): void => {
          setObjectInputs((prev) => ({ ...prev, [fieldName]: value }))
          if (inputErrors[fieldName]) {
            setInputErrors((prev) => ({ ...prev, [fieldName]: '' }))
          }
        }

        const canAdd = objectFields.filter((f) => f.required).every((objField) => objectInputs[objField.name]?.trim())

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <div className="space-y-3">
              <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {objectFields.map((objField) => (
                    <div key={objField.name} className="space-y-2">
                      <Label htmlFor={`${name}-${objField.name}`} className="text-sm">
                        {objField.label}
                        {objField.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id={`${name}-${objField.name}`}
                        type={objField.type || 'text'}
                        placeholder={objField.placeholder}
                        value={objectInputs[objField.name] || ''}
                        onChange={(e) => updateObjectInput(objField.name, e.target.value)}
                        className={inputErrors[objField.name] ? 'border-destructive' : ''}
                      />
                      {inputErrors[objField.name] && (
                        <p className="text-destructive text-xs">{inputErrors[objField.name]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button type="button" variant="outline" size="sm" onClick={addObject} disabled={!canAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </div>

              {values.length > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {values.map((item: Record<string, any>, index: number) => (
                      <div
                        key={index}
                        className="bg-primary/10 text-primary border-primary/20 flex items-center gap-3 rounded-lg border px-3 py-2 text-sm"
                      >
                        <div className="flex flex-col gap-0.5">
                          {objectFields.map((objField) => (
                            <span key={objField.name} className="text-xs">
                              <span className="font-medium">{objField.label}:</span>{' '}
                              {objField.type === 'number' && typeof item[objField.name] === 'number'
                                ? item[objField.name].toFixed(2)
                                : item[objField.name]}
                            </span>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeObject(index)}
                          className="hover:bg-primary/20 h-auto rounded-full p-1"
                          aria-label={`Remove item ${index + 1}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {values.length} item{values.length !== 1 ? 's' : ''} added
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

// Field Component
const Field = ({
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
  const { control } = useRHFContext()

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

  // Handle list field type
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

// Form Step Component
const FormStep = ({ value, title, description, children }: FormStepProps) => {
  const { currentStep } = useFormContext()
  const isActive = currentStep.toString() === value

  if (!isActive) return null

  return (
    <div className="space-y-6">
      {title && <h3 className="text-foreground text-2xl font-semibold">{title}</h3>}
      {description && <p className="text-muted-foreground">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

// Main MultiStepForm Component
const MultiStepForm = ({
  children,
  onSubmit,
  onStepSubmit,
  submitMode = 'batch',
  title = 'Multi Step Form',
  className = '',
}: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [allStepData, setAllStepData] = useState<Record<string, any>>({})

  // Extract forms from children
  const forms = React.Children.toArray(children).filter(
    (child): child is ReactElement<FormStepProps> => isValidElement(child) && (child as any).type === FormStep,
  )

  const totalSteps = forms.length
  const currentForm = forms[currentStep]
  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0

  // Get current step schema - use empty object schema if none provided
  const currentStepSchema = currentForm?.props.schema || z.object({})

  // Initialize form with react-hook-form with proper default values
  const getDefaultValues = useCallback(() => {
    const stepData = allStepData[currentStep] || {}
    // Ensure all form fields have default values to prevent controlled/uncontrolled issues
    const defaultValues: Record<string, any> = {}

    // Set defaults based on the current step's children
    React.Children.forEach(children, (child) => {
      if (isValidElement<FormStepProps>(child) && child.type === FormStep) {
        React.Children.forEach(child.props.children, (fieldChild) => {
          if (isValidElement<FieldProps>(fieldChild) && fieldChild.props.name) {
            const fieldName = fieldChild.props.name
            const fieldType = fieldChild.props.type

            if (stepData[fieldName] !== undefined) {
              defaultValues[fieldName] = stepData[fieldName]
            } else {
              // Set appropriate default based on field type
              if (fieldType === 'list' || fieldType === 'list-object') {
                defaultValues[fieldName] = []
              } else {
                defaultValues[fieldName] = ''
              }
            }
          }
        })
      }
    })

    return defaultValues
  }, [allStepData, currentStep, children])

  const form = useForm({
    resolver: zodResolver(currentStepSchema as any),
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  })

  // Update form when step changes
  useEffect(() => {
    const stepData = allStepData[currentStep] || {}
    form.reset(stepData)
  }, [currentStep, allStepData, form])

  const nextStep = useCallback(async (): Promise<void> => {
    const isValid = await form.trigger()
    if (!isValid) return

    const currentStepData = form.getValues()
    const updatedAllData = { ...allStepData, [currentStep]: currentStepData }
    setAllStepData(updatedAllData)

    if (submitMode === 'individual' && onStepSubmit) {
      setIsSubmitting(true)
      try {
        await onStepSubmit(currentStepData, currentStep)
        setCompletedSteps((prev) => new Set([...prev, currentStep]))
      } catch (error) {
        console.error('Step submission failed:', error)
        setIsSubmitting(false)
        return
      }
      setIsSubmitting(false)
    } else {
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep, form, allStepData, submitMode, onStepSubmit, totalSteps])

  const prevStep = useCallback((): void => {
    if (currentStep > 0) {
      const currentStepData = form.getValues()
      const updatedAllData = { ...allStepData, [currentStep]: currentStepData }
      setAllStepData(updatedAllData)
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep, form, allStepData])

  const submitForm = useCallback(async (): Promise<void> => {
    const isValid = await form.trigger()
    if (!isValid) return

    const currentStepData = form.getValues()
    const completeData = { ...(allStepData || {}), [currentStep]: currentStepData }

    // Flatten the data structure for final submission
    const flattenedData = Object.values(completeData).reduce<Record<string, any>>((acc, stepData) => {
      return { ...acc, ...(stepData || {}) }
    }, {})

    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(flattenedData as Record<string, any>)
      }
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
    } catch (error) {
      console.error('Final submission failed:', error)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
  }, [allStepData, currentStep, onSubmit, form])

  const onFormSubmit = form.handleSubmit(async () => {
    if (isLastStep) {
      if (submitMode === 'batch') {
        await submitForm()
      } else {
        await nextStep()
      }
    } else {
      await nextStep()
    }
  })

  const progress = ((currentStep + 1) / totalSteps) * 100

  const contextValue: FormContextType = {
    currentStep,
    totalSteps,
    allStepData,
    isSubmitting,
    completedSteps,
    nextStep,
    prevStep,
    submitForm,
  }

  return (
    <FormContext.Provider value={contextValue}>
      <FormProvider {...form}>
        <div className={`mx-auto w-full max-w-4xl space-y-6 ${className}`}>
          {/* Header */}
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-foreground text-3xl font-bold">{title}</h1>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <div className="text-muted-foreground flex justify-between text-sm">
                <span className="text-foreground font-medium">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <Form {...form}>
            <form onSubmit={onFormSubmit} className="space-y-6">
              <div className="bg-card rounded-xl border p-8 shadow-sm">{children}</div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep} disabled={isFirstStep || isSubmitting}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`flex h-3 w-3 items-center justify-center rounded-full transition-colors ${
                        completedSteps.has(i) ? 'bg-green-500' : i === currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      {completedSteps.has(i) && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                  ))}
                </div>

                <Button type="submit" disabled={isSubmitting} className="min-w-[100px]">
                  {isSubmitting && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  {isLastStep ? (
                    submitMode === 'batch' ? (
                      'Submit All'
                    ) : (
                      'Finish'
                    )
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </FormProvider>
    </FormContext.Provider>
  )
}

export { Field, FormStep, MultiStepForm }
