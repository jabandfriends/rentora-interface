import type { ReactNode } from 'react'
import type z from 'zod'

import type { USER_FORM_SCHEMA } from '@/constants'
import type { Maybe } from '@/types'

export type USER_FORM_SCHEMA_TYPE = z.infer<typeof USER_FORM_SCHEMA>

export type IUserFormProps = {
  onSubmit: (data: USER_FORM_SCHEMA_TYPE) => void
  iconLabel: ReactNode
  buttonLabel: string
  defaultValues?: Partial<USER_FORM_SCHEMA_TYPE>
  isPending: boolean
  errorMessage: Maybe<string>
}
