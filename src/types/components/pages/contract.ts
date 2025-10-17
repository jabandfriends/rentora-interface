import z from 'zod'

import type { MONTHLY_CONTRACT_SCHEMA } from '@/constants'

export type MonthlyContractFormData = z.infer<typeof MONTHLY_CONTRACT_SCHEMA>

export type IContractDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  handleSubmit: (data: TerminationFormValues) => void
}
export const terminationFormSchema = z.object({
  terminationReason: z.string().min(1, 'Termination reason is required'),
})
export type TerminationFormValues = z.infer<typeof terminationFormSchema>
