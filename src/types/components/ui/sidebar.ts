import type { ReactNode } from 'react'

import type { Maybe } from '@/types/utils'

export type SidebarMenu = {
  label: string
  to: string
  icon?: ReactNode
}

export type SidebarNavMenu = {
  type: 'item' | 'collapsible'
  topic?: string
  title?: string
  icon?: ReactNode
  menu: Maybe<Array<SidebarMenu>>
}
