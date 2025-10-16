import z from 'zod'

import type { FORM_SECTION } from '@/types'
import type { USER_FORM_FIELDS_TYPE } from '@/types/constant/user'

export const USER_FORM_SCHEMA = z.object({
  firstName: z.string().max(50, 'First name must be at most 50 characters long.').optional().nullable(),
  lastName: z.string().max(50, 'Last name must be at most 50 characters long.').optional().nullable(),
  email: z.string().max(100, 'Email must be at most 100 characters long.').optional().nullable(),
  phoneNumber: z.string().max(10, 'Phone number must be at most 10 characters long.').optional().nullable(),
  nationalId: z.string().max(13, 'National ID must be at most 13 characters long.').optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  emergencyContactName: z
    .string()
    .max(50, 'Emergency contact name must be at most 50 characters long.')
    .optional()
    .nullable(),
  emergencyContactPhone: z
    .string()
    .max(10, 'Emergency contact phone must be at most 10 characters long.')
    .optional()
    .nullable(),
})

export const USER_FORM_FIELDS: Array<FORM_SECTION<USER_FORM_FIELDS_TYPE>> = [
  {
    title: 'Account Detail',
    description: 'Basic information about account',
    fields: [
      {
        fieldType: 'layout',
        layout: 'row',
        key: 'firstName',
        fields: [
          {
            key: 'firstName',
            label: 'First Name',
            placeholder: 'Enter first name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 50,
          },
          {
            key: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter last name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 50,
          },
        ],
      },
      {
        key: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        fieldType: 'input',
        maxLength: 100,
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        fieldType: 'input',
        inputType: 'number',
        maxLength: 10,
      },

      {
        key: 'nationalId',
        label: 'National ID',
        placeholder: 'Enter national ID',
        fieldType: 'input',
        inputType: 'number',
        maxLength: 13,
      },
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        fieldType: 'input',
        inputType: 'date',
      },
      {
        key: 'emergencyContactName',
        label: 'Emergency Contact Name',
        fieldType: 'layout',
        layout: 'row',
        fields: [
          {
            key: 'emergencyContactName',
            label: 'Emergency Contact Name',
            placeholder: 'Enter emergency contact name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 100,
          },
          {
            key: 'emergencyContactPhone',
            label: 'Emergency Contact Phone',
            placeholder: 'Enter emergency contact phone',
            fieldType: 'input',
            inputType: 'number',
            maxLength: 10,
          },
        ],
      },
    ],
  },
]
