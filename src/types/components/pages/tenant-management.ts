import type z from 'zod'

import type { TENANT_FORM_SCHEMA } from '@/constants'

export type TENANT_FORM_SCHEMA_TYPE = z.infer<typeof TENANT_FORM_SCHEMA>

export type ITENANTFormProps = {
  onSubmit: (data: TENANT_FORM_SCHEMA_TYPE) => void
}
