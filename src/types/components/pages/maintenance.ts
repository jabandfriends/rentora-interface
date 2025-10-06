import type { ReactNode } from 'react'
import type z from 'zod'

import type { UPDATE_MAINTENANCE_FORM_SCHEMA } from '@/constants'
import type { Maybe } from '@/types/utils'

export type UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE = z.infer<typeof UPDATE_MAINTENANCE_FORM_SCHEMA>

export type IMaintenanceFormProps = {
  onSubmit: (data: UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE) => void
  iconLabel: ReactNode
  buttonLabel: string
  defaultValues?: Partial<UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE>
  isPending: boolean
  errorMessage: Maybe<string>
}
