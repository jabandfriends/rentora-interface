import type { ReactNode } from 'react'
import type z from 'zod'

import type { CREATE_TENANT_FORM_SCHEMA, TENANT_PASSWORD_UPDATE_SCHEMA, UPDATE_TENANT_FORM_SCHEMA } from '@/constants'
import type { Maybe } from '@/types'

export type UPDATE_TENANT_FORM_SCHEMA_TYPE = z.infer<typeof UPDATE_TENANT_FORM_SCHEMA>
export type CREATE_TENANT_FORM_SCHEMA_TYPE = z.infer<typeof CREATE_TENANT_FORM_SCHEMA>

export type ITenantFormProps = {
  onSubmit: (data: UPDATE_TENANT_FORM_SCHEMA_TYPE) => void
  iconLabel: ReactNode
  buttonLabel: string
  defaultValues?: Partial<UPDATE_TENANT_FORM_SCHEMA_TYPE>
  isPending: boolean
  errorMessage: Maybe<string>
}

export type TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA = z.infer<typeof TENANT_PASSWORD_UPDATE_SCHEMA>
