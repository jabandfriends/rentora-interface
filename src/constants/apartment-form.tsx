import { Building, Calendar, DollarSign, Phone, Upload } from 'lucide-react'
import { z } from 'zod'

import { APARTMENT_FORM_FIELD_KEY_ENUM } from '@/enum'
import type { APARTMENT_FORM_FIELD, FORM_SECTION } from '@/types'

export const APARTMENT_FORM_SCHEMA = z.object({
  files: z.array(z.instanceof(File)).max(1, {
    message: 'Only 1 file is allowed',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
  address: z.string().min(2, {
    message: 'Address must be at least 2 characters long',
  }),
  phone: z.string().min(10, {
    message: 'Phone must have at least 10 characters',
  }),
  taxId: z.string().min(13, {
    message: 'Tax ID must have at least 13 characters',
  }),
  paymentDueDate: z.string().min(1, {
    message: 'Payment due date is required',
  }),
  lateFee: z.string().min(1, {
    message: 'Late fee is required',
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
    ],
  },
  {
    icon: <Upload size={20} className="text-theme-primary" />,
    title: 'Additional Details',
    description: 'Contact information and legal documentation for your apartment business',
    fields: [
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.phone,
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        description: 'This is your phone number.',
        prefix: <Phone size={16} />,
        type: 'number',
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.taxId,
        label: 'Tax ID',
        placeholder: 'Enter tax ID',
        description: 'This is your tax ID.',
        prefix: <DollarSign size={16} />,
        type: 'number',
      },
    ],
  },
  {
    icon: <Upload size={20} className="text-theme-primary" />,
    title: 'Payment & Late Fee Settings',
    description: 'Configure rent payment due dates and late fee penalties for your tenants.',
    fields: [
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.paymentDueDate,
        label: 'Payment Due Date',
        placeholder: 'Enter payment due date',
        description: 'This is your payment due date.',
        prefix: <Calendar size={16} />,
        type: 'date',
      },
      {
        key: APARTMENT_FORM_FIELD_KEY_ENUM.lateFee,
        label: 'Late Fee',
        placeholder: 'Enter late fee',
        description: 'This is your late fee.',
        prefix: <DollarSign size={16} />,
        type: 'number',
      },
    ],
  },
]
