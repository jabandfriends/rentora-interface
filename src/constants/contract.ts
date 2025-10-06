import z from 'zod'

export enum ContractType {
  MONTHLY = 'monthly',
  DAILY = 'daily',
  YEARLY = 'yearly',
}

export const MONTHLY_CONTRACT_SCHEMA = z
  .object({
    unitId: z.string().uuid(),
    tenantId: z.string().uuid(),
    guarantorName: z.string().min(1, 'Guarantor name is required'),
    guarantorPhone: z.string().min(10, 'Valid phone number is required'),
    guarantorIdNumber: z.string().min(13, 'Valid ID number is required'),
    rentalType: z.enum(['monthly', 'daily', 'yearly']),
    startDate: z.date(),
    endDate: z.date(),
    rentalPrice: z.string().min(1, 'Rental price is required'),
    depositAmount: z.string().min(1, 'Deposit amount is required'),
    advancePaymentMonths: z.string().min(1, 'Advance payment months is required'),
    lateFeeAmount: z.string().min(1, 'Late fee amount is required'),
    utilitiesIncluded: z.boolean(),
    termsAndConditions: z.string().optional(),
    specialConditions: z.string().optional(),
    autoRenewal: z.boolean(),
    renewalNoticeDays: z.string().min(1, 'Renewal notice days is required'),
    documentUrl: z.string().url().optional().or(z.literal('')),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: 'Start date must be before end date',
    path: ['endDate'],
  })
