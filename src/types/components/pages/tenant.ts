import type z from 'zod'

import type { TENANT_FORM_SCHEMA, TENANT_PASSWORD_UPDATE_SCHEMA } from '@/constants'

export type TENANT_FORM_SCHEMA_TYPE = z.infer<typeof TENANT_FORM_SCHEMA>

export type ITenantFormProps = {
  onSubmit: (data: TENANT_FORM_SCHEMA_TYPE) => void
}

export type TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA = z.infer<typeof TENANT_PASSWORD_UPDATE_SCHEMA>
