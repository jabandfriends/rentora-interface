import type z from 'zod'

import type { AUTHENTICATION_FORM_SCHEMA } from '@/constants'

export type AUTHENTICATION_FORM_FIELD = { label: string; key: 'email' | 'password'; placeholder: string; type: string }

export type AUTHENTICATION_FORM_SCHEMA_TYPE = z.infer<typeof AUTHENTICATION_FORM_SCHEMA>
