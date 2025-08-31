import { FileSpreadsheet, FileText, Home, Settings, Table } from 'lucide-react'

import { ROUTES } from '@/constants'
import type { SidebarMenu, SidebarNavMenu } from '@/types'

//sidebar menu
export const SIDEBAR_ITEMS: Array<SidebarMenu> = [
  { icon: <Home size={16} />, label: 'Dashboard', to: ROUTES.overview.path },
]

//sidebar all rooms menu
export const SIDEBAR_ALL_ROOMS: Array<SidebarMenu> = [
  { icon: <Table size={16} />, label: 'All Rooms', to: ROUTES.allRoom.path },
]

//sidebar collapse menu
//sidebar collapse report menu
export const SIDEBAR_COLLAPSE_ROOMS_REPORT: Array<SidebarMenu> = [
  { label: 'Room Report', to: ROUTES.roomReport.path },
  { label: 'Receipt Report', to: ROUTES.receiptReport.path },
]

//sidebar invoice collapse menu
export const SIDEBAR_COLLAPSE_ITEMS: Array<SidebarMenu> = [
  { label: 'Normal Invoices', to: ROUTES.normalInvoice.path },
  { label: 'Monthly Invoices', to: ROUTES.monthlyInvoice.path },
  { label: 'Overdue Invoices', to: ROUTES.overdueInvoice.path },
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
    title: 'Invoices',
    icon: <FileSpreadsheet size={16} />,
    menu: SIDEBAR_COLLAPSE_ITEMS,
  },
  {
    type: 'item',
    title: 'All Room',
    icon: <Table size={16} />,
    menu: SIDEBAR_ALL_ROOMS,
  },
  {
    type: 'collapsible',
    title: 'Reports',
    icon: <FileText size={16} />,
    menu: SIDEBAR_COLLAPSE_ROOMS_REPORT,
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
