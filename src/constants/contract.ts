import z from 'zod'

export enum ContractType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
export const contractUpdateFormSchema = z.object({
  endDate: z.date().optional(),
  rentalPrice: z.string().optional(),
  depositAmount: z.string().optional(),
  advancePaymentMonths: z.string().optional(),
  termsAndConditions: z.string().optional(),
  specialConditions: z.string().optional(),
})

export const MONTHLY_CONTRACT_SCHEMA = z
  .object({
    unitId: z.string(),
    tenantId: z.string().min(1, 'Tenant is required'),
    tenantName: z.string(),
    rentalType: z.enum(ContractType, {
      error: 'Rental type is required',
    }),
    startDate: z.date({ error: 'Start date is required' }),
    endDate: z.date({ error: 'End date is required' }),
    rentalPrice: z.string().min(1, 'Rental price is required'),
    depositAmount: z.string(),
    advancePaymentMonths: z.string(),
    termsAndConditions: z.string().optional(),
    specialConditions: z.string().optional(),
    autoRenewal: z.boolean(),
    renewalNoticeDays: z.string(),
    documentUrl: z.string().optional().or(z.literal('')),
    waterMeterStart: z.string().min(1, 'Water meter is required'),
    electricMeterStart: z.string().min(1, 'Electricity meter is required'),
  })
  .superRefine((data, ctx) => {
    const start: Date = data.startDate
    const end: Date = data.endDate

    if (data.autoRenewal) {
      if (Number(data.renewalNoticeDays) < 1) {
        ctx.addIssue({
          path: ['renewalNoticeDays'],
          message: 'Renewal notice days must be at least 1 day',
          code: 'custom',
        })
      }
    }

    //check end date
    if (start > end) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'End date must be after start date',
        code: 'custom',
      })
      return // stop further checks if dates are invalid
    }

    const diffInDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

    if (data.rentalType === ContractType.MONTHLY) {
      if (diffInDays < 28) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'Monthly rental must be at least 1 month (28 days)',
          code: 'custom',
        })
      }
      if (diffInDays > 30 * 12) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'Monthly rental cannot exceed 12 months',
          code: 'custom',
        })
      }
    } else if (data.rentalType === ContractType.YEARLY) {
      if (diffInDays < 31 * 12 + 1) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'Yearly rental must be at least 1 year',
          code: 'custom',
        })
      }
    }
  })
