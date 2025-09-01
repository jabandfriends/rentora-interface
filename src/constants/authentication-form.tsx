import { z } from 'zod'

import type { AUTHENTICATION_FORM_FIELD } from '@/types'

export const AUTHENTICATION_FORM_SCHEMA = z.object({
  email: z.email({
    message: 'Invalid email format',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters long',
  }),
  acceptTerms: z.literal(true, {
    message: 'You must accept the terms',
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
