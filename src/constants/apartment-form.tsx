import { Building, Calendar, DollarSign, Phone, Upload } from 'lucide-react'
import { z } from 'zod'

import { APARTMENT_FORM_FIELD_KEY_ENUM, LateFeeType } from '@/enum'
import type { APARTMENT_FORM_FIELD, FORM_SECTION } from '@/types'

export const APARTMENT_FORM_SCHEMA = z.object({
  logoFile: z.array(z.instanceof(File)).max(1, {
    message: 'Only 1 file is allowed',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
  address: z.string().optional(),
  phoneNumber: z.string().min(10, {
    message: 'Phone must have at least 10 characters',
  }),
  taxId: z.string().optional(),
  paymentDueDay: z.string().min(1, {
    message: 'Payment due day is required',
  }),
  lateFee: z.string().min(1, {
    message: 'Late fee is required',
  }),
  lateFeeType: z.string().min(1, {
    message: 'Late fee type is required',
  }),
  gracePeriodDays: z.string().min(1, {
    message: 'Grace period is required',
  }),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().min(2, {
    message: 'Postal code is required',
  }),
  country: z.string().min(2, {
    message: 'Country is required',
  }),
})

export const APARTMENT_FORM_SECTIONS: Array<FORM_SECTION<APARTMENT_FORM_FIELD>> = [
  {
    icon: <Upload size={20} className="text-theme-primary" />,
    title: 'Apartment Details',
    description: 'Basic information about your apartment property including name and location',
    fields: [
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.name,
        label: 'Apartment Name',
        description: 'This is your public display name.',
        placeholder: 'Enter apartment name',
        prefix: <Building size={16} />,
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.address,
        label: 'Location',
        placeholder: 'Enter apartment address',
        description: 'This is your apartment address.',
        prefix: <Building size={16} />,
        type: 'textarea',
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.city,
        label: 'City',
        placeholder: 'Enter city',
        description: 'This is your city.',
        prefix: <Building size={16} />,
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.state,
        label: 'State',
        placeholder: 'Enter state',
        description: 'This is your state.',
        prefix: <Building size={16} />,
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.postalCode,
        label: 'Postal Code',
        placeholder: 'Enter postal code',
        description: 'This is your postal code.',
        prefix: <Building size={16} />,
        type: 'number',
        maxChars: 5,
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.country,
        label: 'Country',
        placeholder: 'Enter country',
        description: 'This is your country.',
        prefix: <Building size={16} />,
      },
    ],
  },
  {
    icon: <Upload size={20} className="text-theme-primary" />,
    title: 'Additional Details',
    description: 'Contact information and legal documentation for your apartment business',
    fields: [
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.phoneNumber,
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        description: 'This is your phone number.',
        prefix: <Phone size={16} />,
        type: 'number',
        maxChars: 10,
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.taxId,
        label: 'Tax ID',
        placeholder: 'Enter tax ID',
        description: 'This is your tax ID.',
        prefix: <DollarSign size={16} />,
        type: 'number',
        maxChars: 13,
      },
    ],
  },
  {
    icon: <Upload size={20} className="text-theme-primary" />,
    title: 'Payment & Late Fee Settings',
    description: 'Configure rent payment due dates and late fee penalties for your tenants.',
    fields: [
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.paymentDueDay,
        label: 'Payment Due Day',
        placeholder: 'Enter payment due day',
        description: 'This is your payment due day. It is the day of the month when rent is due.',
        prefix: <Calendar size={16} />,
        type: 'select',
        options: Array.from({ length: 31 }, (_, i) => ({
          label: (i + 1).toString(),
          value: (i + 1).toString(),
        })),
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.gracePeriodDays,
        label: 'Grace Period',
        placeholder: 'Enter grace period',
        description:
          'This is your grace period. It is the number of days after the payment due day when late fees begin to accrue.',
        prefix: <Calendar size={16} />,
        type: 'select',
        options: Array.from({ length: 31 }, (_, i) => ({
          label: (i + 1).toString(),
          value: (i + 1).toString(),
        })),
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.lateFeeType,
        label: 'Late Fee Type',
        placeholder: 'Enter late fee type',
        description: 'This is your late fee type.',
        prefix: <Calendar size={16} />,
        type: 'select',
        options: [
          { label: 'Fixed', value: LateFeeType.FIXED },
          { label: 'Percentage', value: LateFeeType.PERCENTAGE },
        ],
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.lateFee,
        label: 'Late Fee',
        placeholder: 'Enter late fee',
        description: 'This is your late fee.',
        prefix: <DollarSign size={16} />,
        type: 'number',
        decimal: true,
        maxChars: 9,
      },
    ],
  },
]
