import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, ChevronRight } from 'lucide-react'
import {
  Children,
  createContext,
  isValidElement,
  type ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Form, Spinner } from '@/components/common'
import { Progress } from '@/components/feature'
import type { FieldProps, FormContextType, FormStepProps, MultiStepFormProps } from '@/types'
import { cn } from '@/utilities'

// Context
const FormContext = createContext<FormContextType | null>(null)
const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('Form components must be used within MultiStepForm')
  }
  return context
}

const FormStep = ({ value, title, description, children }: FormStepProps) => {
  const { currentStep } = useFormContext()
  const isActive = currentStep.toString() === value

  if (!isActive) return null

  return (
    <div className="space-y-6">
      <div className="border-theme-secondary-300 border-b pb-2">
        {title && <h3>{title}</h3>}
        {description && <p className="text-theme-secondary text-body-2">{description}</p>}
      </div>
      <div className="space-y-2">{children}</div>
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
  const forms = Children.toArray(children).filter(
    (child): child is ReactElement<FormStepProps> => isValidElement(child) && (child as any).type === FormStep,
  )

  const totalSteps = forms.length
  const currentForm = forms[currentStep]
  const isLastStep = useMemo(() => currentStep === totalSteps - 1, [currentStep, totalSteps])

  // Get current step schema
  const currentStepSchema = useMemo(() => currentForm?.props.schema || z.object({}), [currentForm])

  // Button text
  const buttonText: string = useMemo(() => {
    if (isLastStep) {
      return 'Submit'
    }
    return 'Next'
  }, [isLastStep])

  // Initialize form with react-hook-form
  const getDefaultValues = useCallback(() => {
    const stepData = allStepData[currentStep] || {}
    const defaultValues: Record<string, any> = {}

    Children.forEach(children, (child) => {
      if (isValidElement<FormStepProps>(child) && child.type === FormStep) {
        if (child.props.value.toString() === currentStep.toString()) {
          Children.forEach(child.props.children, (fieldChild) => {
            if (isValidElement<FieldProps>(fieldChild) && fieldChild.props.name) {
              const fieldName = fieldChild.props.name
              const fieldType = fieldChild.props.type

              if (stepData[fieldName] !== undefined) {
                defaultValues[fieldName] = stepData[fieldName]
              } else {
                if (fieldType === 'list' || fieldType === 'list-object') {
                  defaultValues[fieldName] = []
                } else {
                  defaultValues[fieldName] = ''
                }
              }
            }
          })
        }
      }
    })
    return defaultValues
  }, [allStepData, currentStep, children])

  const form = useForm({
    resolver: (values, context, options) => zodResolver(currentStepSchema as any)(values, context, options),
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  })

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
        alert('Step submission failed:' + error)
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

    // Flatten the data structure
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
      alert('Final submission failed:' + error)
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

  const progress = useMemo(
    () => (totalSteps <= 1 ? 100 : (currentStep / (totalSteps - 1)) * 100),
    [totalSteps, currentStep],
  )

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
        <div className={cn('w-full max-w-4xl space-y-6 py-2', className)}>
          {/* Header */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-foreground text-3xl font-bold">{title}</h2>
            </div>

            <div className="space-y-2">
              <Progress value={progress} />
              <div className="text-theme-secondary text-body-2 flex justify-between">
                <span>
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <Form {...form}>
            <form onSubmit={onFormSubmit} className="space-y-6">
              <div className="bg-theme-light rounded-xl p-8 shadow-sm">{children}</div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={cn('flex size-3 items-center justify-center rounded-full duration-75', [
                        completedSteps.has(i) && 'bg-theme-success',
                        i === currentStep && 'bg-theme-primary',
                        !completedSteps.has(i) && i !== currentStep && 'bg-theme-secondary-300',
                      ])}
                    >
                      {completedSteps.has(i) && <CheckCircle className="text-theme-white h-3 w-3" />}
                    </div>
                  ))}
                </div>

                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  {isSubmitting && <Spinner className="size-4" />}
                  {buttonText}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </FormProvider>
    </FormContext.Provider>
  )
}

export { FormStep, MultiStepForm }
