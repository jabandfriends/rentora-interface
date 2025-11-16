import {
  BookUser,
  DollarSign,
  FileSpreadsheet,
  FileText,
  Home,
  Package,
  Settings,
  Table,
  Wrench,
  Zap,
} from 'lucide-react'

import { ROUTES } from '@/constants'
import { TENANT_ROLE } from '@/enum'
import type { Maybe, SidebarItems } from '@/types'

export const SIDEBAR_CONFIG: Array<SidebarItems> = [
  {
    type: 'item',
    topic: 'All Apartments',
    label: 'All Apartments',
    icon: <Table size={16} />,
    roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING, TENANT_ROLE.MAINTENANCE],
    to: () => ROUTES.allApartment.path,
  },
  {
    type: 'item',
    topic: 'Main Menu',
    label: 'Dashboard',
    icon: <Home size={16} />,
    roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING, TENANT_ROLE.MAINTENANCE],
    to: (id?: string) => ROUTES.overview.getPath(id),
  },
  {
    type: 'collapsible',
    label: 'Invoices',
    icon: <FileSpreadsheet size={16} />,
    collapsibleMenu: [
      {
        label: 'Adhoc Invoices',
        roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING],
        to: (id?: string) => ROUTES.normalInvoice.getPath(id),
      },
      {
        label: 'Monthly Rental Invoices',
        roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING],
        to: (id?: string) => ROUTES.monthlyInvoice.getPath(id),
      },
      {
        label: 'Overdue Invoices',
        roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING],
        to: (id?: string) => ROUTES.overdueInvoice.getPath(id),
      },
    ],
  },
  {
    type: 'item',
    label: 'Payments',
    icon: <DollarSign size={16} />,
    roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING],
    to: (id?: string) => ROUTES.payment.getPath(id),
  },
  {
    type: 'item',
    label: 'All Rooms',
    icon: <Table size={16} />,
    roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING],
    to: (id?: string) => ROUTES.allRoom.getPath(id),
  },
  {
    type: 'item',
    label: 'Supplies',
    icon: <Package size={16} />,
    roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.MAINTENANCE],
    to: (id?: string) => ROUTES.supplyList.getPath(id),
  },
  {
    type: 'item',
    label: 'Meter Reading',
    icon: <Zap size={16} />,
    roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING],
    to: (id?: string) => ROUTES.meterReadingList.getPath(id),
  },
  {
    type: 'collapsible',
    label: 'Reports',
    icon: <FileText size={16} />,
    collapsibleMenu: [
      {
        label: 'Electric & Water Report',
        roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING],
        to: (id?: string) => ROUTES.electricWaterReport.getPath(id),
      },
    ],
  },
  {
    type: 'item',
    label: 'Maintenance',
    icon: <Wrench size={16} />,
    roles: [TENANT_ROLE.ADMIN, TENANT_ROLE.MAINTENANCE],
    to: (id?: string) => ROUTES.maintenance.getPath(id),
  },
  {
    type: 'item',
    label: 'Users Management',
    icon: <BookUser size={16} />,
    roles: [TENANT_ROLE.ADMIN],
    to: (id?: string) => ROUTES.tenant.getPath(id),
  },
]

export const SIDEBAR_BOTTOM: Array<SidebarItems> = [
  {
    type: 'item',
    topic: 'Settings',
    label: 'Settings',
    icon: <Settings size={16} />,
    roles: [TENANT_ROLE.ADMIN],
    to: (id?: string) => ROUTES.apartmentSetting.getPath(id),
  },
]

export const getSidebarItems = (apartmentId: Maybe<string>, currentUserRole: Maybe<TENANT_ROLE>) => {
  if (!apartmentId || !currentUserRole) return { topNav: [], bottomNav: [] }

  const filterMenu = (menu: Array<SidebarItems>) =>
    menu.filter((item: SidebarItems) => {
      if (item.type === 'item') {
        return item.roles.includes(currentUserRole)
      }
      if (item.type === 'collapsible') {
        return item.collapsibleMenu.some((m) => m.roles.includes(currentUserRole))
      }
      return false
    })

  const processedTop: Array<SidebarItems> = filterMenu(SIDEBAR_CONFIG)

  const processedBottom: Array<SidebarItems> = filterMenu(SIDEBAR_BOTTOM)

  return { topNav: processedTop, bottomNav: processedBottom }
}
