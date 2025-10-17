import { z } from 'zod'

import type { AUTHENTICATION_FORM_FIELD } from '@/types'

export const AUTHENTICATION_FORM_SCHEMA = z.object({
  email: z.email({
    message: 'Invalid email format',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters long',
  }),
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
