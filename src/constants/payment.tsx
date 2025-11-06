import z from 'zod'

export const PAYMENT_TABLE_HEADER: Array<string> = [
  'Payment No.',
  'Unit Name',
  'Building Name',
  'Amount',
  'Payment Status',
  'Action',
]

export const paymentUpdateFormSchema = z.object({
  receiptImageFile: z.array(z.instanceof(File)).max(1, {
    message: 'Only 1 file is allowed',
  }),
})
