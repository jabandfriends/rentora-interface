import type z from 'zod'

import type { MAINTENANCE_FORM_SCHEMA } from '@/constants'

export type MAINTENANCE_FORM_SCHEMA_TYPE = z.infer<typeof MAINTENANCE_FORM_SCHEMA>

export type IMaintenanceFormProps = {
  onSubmit: (data: MAINTENANCE_FORM_SCHEMA_TYPE) => void
}
