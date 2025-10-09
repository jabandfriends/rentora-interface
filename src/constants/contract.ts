import z from 'zod'

export enum ContractType {
  MONTHLY = 'monthly',
  DAILY = 'daily',
  YEARLY = 'yearly',
}

export const MONTHLY_CONTRACT_SCHEMA = z
  .object({
    unitId: z.string(),
    tenantId: z.string().min(1, 'Tenant is required'),
    tenantName: z.string(),
    guarantorName: z.string().min(1, 'Guarantor name is required'),
    guarantorPhone: z
      .string()
      .min(10, 'Valid phone number is required')
      .regex(/^0[0-9]{9}$/, 'Phone number must be 10 digits and start with 0'),
    guarantorIdNumber: z.string().min(13, 'Valid ID number is required'),
    rentalType: z.enum([ContractType.MONTHLY, ContractType.DAILY, ContractType.YEARLY], {
      error: 'Rental type is required',
    }),
    startDate: z.date({ error: 'Start date is required' }),
    endDate: z.date({ error: 'End date is required' }),
    rentalPrice: z.string().min(1, 'Rental price is required'),
    depositAmount: z.string().min(1, 'Deposit amount is required'),
    advancePaymentMonths: z.string().optional(),
    lateFeeAmount: z.string().min(1, 'Late fee amount is required'),
    utilitiesIncluded: z.boolean(),
    termsAndConditions: z.string().optional(),
    specialConditions: z.string().optional(),
    autoRenewal: z.boolean(),
    renewalNoticeDays: z.string().min(1, 'Renewal notice days is required'),
    documentUrl: z.string().url().optional().or(z.literal('')),
    waterMeterStart: z.string().min(1, 'Water meter is required'),
    electricMeterStart: z.string().min(1, 'Electricity meter is required'),
  })
  .superRefine((data, ctx) => {
    const start = data.startDate
    const end = data.endDate

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

    if (data.rentalType === 'daily') {
      if (diffInDays < 1) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'Daily rental must be at least 1 day',
          code: 'custom',
        })
      }
      if (diffInDays > 30) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'Daily rental cannot exceed 30 days',
          code: 'custom',
        })
      }
    } else if (data.rentalType === 'monthly') {
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
    } else if (data.rentalType === 'yearly') {
      if (diffInDays < 31 * 12 + 1) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'Yearly rental must be at least 1 year',
          code: 'custom',
        })
      }
    }
  })
