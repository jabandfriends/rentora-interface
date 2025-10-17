import { Building2, DollarSign, Droplets, Home } from 'lucide-react'
import z from 'zod'

import type { TTabApartmentSetting } from '@/types'

export enum APARTMENT_STATUS {
  active = 'Active',
  inactive = 'Inactive',
  setup_incomplete = 'Setup Incomplete',
  setup_in_progress = 'Setup In Progress',
}

export const TAB_APARTMNET_SETTING_LIST: Array<TTabApartmentSetting> = [
  { value: 'information', label: 'Information', icon: <Home /> },
  { value: 'financial', label: 'Financial', icon: <DollarSign /> },
  // { value: 'services', label: 'Services', icon: <Wrench /> },
  { value: 'utilities', label: 'Utilities', icon: <Droplets /> },
  { value: 'building', label: 'Building', icon: <Building2 /> },
  // { value: 'payment', label: 'Payment', icon: <CreditCard /> },
]

export const apartmentInformationFormSchema = z.object({
  apartmentName: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
})
