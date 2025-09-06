import type { ReactNode } from 'react'

export type FORM_SECTION<T> = {
  icon?: ReactNode
  title: string
  description?: string
  fields: Array<T>
}
