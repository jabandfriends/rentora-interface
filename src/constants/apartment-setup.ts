import { z } from 'zod'

export const serviceSchema = z.object({
  services: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        price: z.number().min(1, 'Price is required'),
      }),
    )
    .min(1, 'At least one service is required'),
})
export const apartmentDetailSchema = z.object({
  waterType: z.string({ error: 'Water Type is required' }).min(1, 'Water type is required'),
  waterPrice: z.string({ error: 'Water Price is required' }).min(1, 'Water price is required'),
  waterFlat: z.string({ error: 'Water Flat is required' }).min(1, 'Water flat is required'),
  electricityType: z.string({ error: 'Electricity Type is required' }).min(1, 'Electricity type is required'),
  electricityPrice: z.string({ error: 'Electricity Price is required' }).min(1, 'Electricity price is required'),
  electricityFlat: z.string({ error: 'Electricity Flat is required' }).min(1, 'Electricity flat is required'),
})

export const paymentInformationSchema = z.object({
  bankName: z.string({ error: 'Bank Name is required' }).min(1, 'Bank name is required'),
  bankAccountNumber: z.string({ error: 'Bank Account Number is required' }).min(1, 'Bank account number is required'),
  bankAccountHolder: z.string({ error: 'Bank Account Holder is required' }).min(1, 'Bank account holder is required'),
})

export const buildingSchema = z.object({
  buildings: z
    .array(
      z.object({
        buildingName: z.string().min(1, { message: 'Building name is required' }),
        totalFloor: z.coerce.number().min(1, { message: 'Total floor must be at least 1' }),
      }),
    )
    .nonempty({ message: 'At least one building is required' }), // <-- nonempty replaces min(1) + default
})
