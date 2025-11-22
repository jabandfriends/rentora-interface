import { z } from 'zod'

import type { AUTHENTICATION_FORM_FIELD, REGISTER_FROM_SCHEMA_TYPE } from '@/types'

export const AUTHENTICATION_FORM_SCHEMA = z.object({
  email: z.email({
    message: 'Invalid email format',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters long',
  }),
})

export const REGISTER_FORM_SCHEMA = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name is required.' })
    .max(50, { message: 'First name must not exceed 50 characters.' }),

  lastName: z
    .string()
    .min(2, { message: 'Lastname is required.' })
    .max(50, { message: 'Last name must not exceed 50 characters.' }),

  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .max(100, { message: 'Email must not exceed 100 characters.' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least 1 uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least 1 lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least 1 number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least 1 special character' }),

  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters.' })
    .max(10, { message: 'Phone number must be 10 digits only.' })
    .regex(/^[0-9]+$/, { message: 'Phone number must contain only numbers.' }),
})

export const AUTHENTICATION_FIELDS: Array<AUTHENTICATION_FORM_FIELD> = [
  {
    label: 'Email address',
    key: 'email',
    placeholder: 'Please enter you Email',
    type: 'text',
  },
  {
    label: 'Password',
    key: 'password',
    placeholder: 'Please enter you Password',
    type: 'password',
  },
]

export type REGISTER_FORM_FIELD_TYPE = {
  label: string
  key: keyof REGISTER_FROM_SCHEMA_TYPE
  placeholder: string
  type: string
  maxLength?: number
}

export const REGISTER_FIELDS: Array<REGISTER_FORM_FIELD_TYPE> = [
  {
    label: 'Firstname',
    key: 'firstName',
    placeholder: 'Please enter firstname',
    type: 'text',
  },
  {
    label: 'Lastname',
    key: 'lastName',
    placeholder: 'Please enter lastname',
    type: 'text',
  },
  {
    label: 'Phone Number',
    key: 'phoneNumber',
    placeholder: 'Please enter phone number.',
    type: 'text',
    maxLength: 10,
  },
  {
    label: 'Email address',
    key: 'email',
    placeholder: 'Please enter you Email',
    type: 'text',
  },
  {
    label: 'Password',
    key: 'password',
    placeholder: 'Please enter you Password',
    type: 'password',
  },
]

//first time password reset
export const FIRST_TIME_PASSWORD_RESET_SCHEMA = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })
