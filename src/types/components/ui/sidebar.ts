import type { ReactNode } from 'react'

import type { TENANT_ROLE } from '@/enum'

export type SidebarBase = {
  topic?: string // menu topic
  label: string
  icon?: ReactNode
}

export type SidebarNavMenu = SidebarBase & {
  type: 'item'
  roles: Array<TENANT_ROLE>
  to: (id?: string) => string
}

export type SidebarCollapsible = SidebarBase & {
  type: 'collapsible'
  collapsibleMenu: Array<SidebarCollapsibleMenu>
}

export type SidebarCollapsibleMenu = {
  label: string
  to: (id?: string) => string
  roles: Array<TENANT_ROLE>
}

export type SidebarItems = SidebarNavMenu | SidebarCollapsible
