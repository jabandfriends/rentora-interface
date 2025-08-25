import { FileSpreadsheet, Home, Settings } from 'lucide-react'

import { ROUTES } from '@/constants'
import type { SidebarMenu, SidebarNavMenu } from '@/types'

//sidebar menu
export const SIDEBAR_ITEMS: Array<SidebarMenu> = [
  { icon: <Home size={16} />, label: 'Dashboard', to: ROUTES.overview.path },
]

//sidebar collapse menu
export const SIDEBAR_COLLAPSE_ITEMS: Array<SidebarMenu> = [
  { label: 'Normal Invoice', to: ROUTES.normalInvoice.path },
  { label: 'Monthly Invoice', to: ROUTES.monthlyInvoice.path },
]

//sidebar bottom items
export const SIDEBAR_BOTTOM_ITEMS: Array<SidebarMenu> = [
  { icon: <Settings size={16} />, label: 'Settings', to: ROUTES.home.path },
]

//sidebar menu items
export const SIDEBAR_ITEMS_MENU: Array<SidebarNavMenu> = [
  {
    type: 'item',
    topic: 'Dashboard',
    icon: <Home size={16} />,
    menu: SIDEBAR_ITEMS,
  },
  {
    type: 'collapsible',
    title: 'Invoice',
    icon: <FileSpreadsheet size={16} />,
    menu: SIDEBAR_COLLAPSE_ITEMS,
  },
]

//sidebar bottom menu items
export const SIDEBAR_BOTTOM_ITEMS_MENU: Array<SidebarNavMenu> = [
  {
    type: 'item',
    icon: <Home size={16} />,
    menu: SIDEBAR_BOTTOM_ITEMS,
  },
]
