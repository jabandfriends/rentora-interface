import type { PropsWithChildren } from 'react'
import type z from 'zod'

export interface FormContextType {
  currentStep: number
  totalSteps: number
  allStepData: Record<string, any>
  isSubmitting: boolean
  completedSteps: Set<number>
  nextStep: () => Promise<void>
  prevStep: () => void
  submitForm: () => Promise<void>
}

export type FormStepProps = PropsWithChildren<{
  value: string
  title?: string
  description?: string
  schema?: z.ZodSchema
}>

export type FieldProps = PropsWithChildren<{
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
}>

export type MultiStepFormProps = PropsWithChildren<{
  onSubmit?: (data: Record<string, any>) => Promise<void> | void
  onStepSubmit?: (data: Record<string, any>, stepIndex: number) => Promise<void> | void
  submitMode?: 'batch' | 'individual'
  title?: string
  className?: string
}>

export type IListFieldProps = {
  name: string
  label: string
  placeholder?: string
  description?: string
  className?: string
}

export type IListObjectField = {
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
}
