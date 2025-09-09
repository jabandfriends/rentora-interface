import z from 'zod'

import type { FORM_SECTION, TENANT_FORM_FIELDS_TYPE } from '@/types'

export const TENANT_FORM_SCHEMA = z.object({
  full_name: z.string(),
  first_name: z.string({ error: 'First name is required.' }).min(1, 'First name is required.'),
  last_name: z.string({ error: 'Last name is required.' }).min(1, 'Last name is required.'),
  email: z.string({ error: 'Email is required.' }).email('Invalid email address.'),
  password: z.string({ error: 'Password is required.' }).min(6, 'Password must be at least 6 characters long.'),
  confirm_password: z.string({ error: 'Confirm password is required.' }).min(1, 'Confirm password is required.'),
  phone: z.string({ error: 'Phone number is required.' }).min(1, 'Phone number is required.'),
  national_id: z.string({ error: 'National ID is required.' }).min(1, 'National ID is required.'),
  birth_date: z.string({ error: 'Birth date is required.' }).min(1, 'Birth date is required.'),
  floor: z.string({ error: 'Floor is required.' }).min(1, 'Floor is required.'),
  room: z.string({ error: 'Room is required.' }).min(1, 'Room is required.'),
})

export const TENANT_FORM_FIELDS: Array<FORM_SECTION<TENANT_FORM_FIELDS_TYPE>> = [
  {
    title: 'Tenant Detail',
    description: 'Basic information about tenant',
    fields: [
      {
        fieldType: 'layout',
        layout: 'row',
        key: 'full_name',
        fields: [
          {
            key: 'first_name',
            label: 'First Name',
            fieldType: 'input',
            inputType: 'text',
          },
          {
            key: 'last_name',
            label: 'Last Name',
            fieldType: 'input',
            inputType: 'text',
          },
        ],
      },
      {
        key: 'email',
        label: 'Email',
        fieldType: 'input',
      },
      {
        key: 'phone',
        label: 'Phone Number',
        fieldType: 'input',
        inputType: 'number',
      },
      {
        key: 'password',
        label: 'Password',
        fieldType: 'input',
      },
      {
        key: 'confirm_password',
        label: 'Confirm Password',
        fieldType: 'input',
      },
      {
        key: 'national_id',
        label: 'National ID',
        fieldType: 'input',
        inputType: 'number',
      },
      {
        key: 'birth_date',
        label: 'Date of Birth',
        fieldType: 'input',
        inputType: 'datetime',
      },
    ],
  },
  {
    title: 'Assign Unit',
    description: 'Unit assigned to the tenant.',
    fields: [
      {
        fieldType: 'layout',
        layout: 'row',
        key: 'floor',
        fields: [
          {
            key: 'floor',
            label: 'Floor',
            fieldType: 'input',
            inputType: 'number',
          },
          {
            key: 'room',
            label: 'Room',
            fieldType: 'input',
            inputType: 'number',
          },
        ],
      },
    ],
  },
]
