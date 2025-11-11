import z from 'zod'

import { PaymentStatus, VerifiedStatus } from '@/enum'

export const PAYMENT_TABLE_HEADER: Array<string> = [
  'Payment No.',
  'Invoice No.',
  'Unit Name',
  'Building Name',
  'Amount',
  'Payment Status',
  'Verified Status',
  'Invoice Status',
  'Action',
]

export const paymentUpdateFormSchema = z.object({
  receiptImageFile: z.array(z.instanceof(File)).max(1, {
    message: 'Only 1 file is allowed',
  }),
  verificationStatus: z.enum(VerifiedStatus),
  paymentStatus: z.enum(PaymentStatus),
})
