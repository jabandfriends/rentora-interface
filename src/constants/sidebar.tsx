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
import type { Maybe, SidebarMenu, SidebarNavMenu } from '@/types'

export const getSidebarItems = (
  apartmentId: Maybe<string>,
): { topNav: Array<SidebarNavMenu>; bottomNav: Array<SidebarNavMenu> } => {
  if (!apartmentId) return { topNav: [], bottomNav: [] }
  // sidebar main items
  const SIDEBAR_ITEMS: Array<SidebarMenu> = [
    { icon: <Home size={16} />, label: 'Dashboard', to: ROUTES.overview.getPath(apartmentId) },
  ]

  // sidebar all rooms
  const SIDEBAR_ALL_ROOMS: Array<SidebarMenu> = [
    { icon: <Table size={16} />, label: 'All Rooms', to: ROUTES.allRoom.getPath(apartmentId) },
  ]
  //sidebar payments
  const SIDEBAR_PAYMENT: Array<SidebarMenu> = [
    { icon: <DollarSign size={16} />, label: 'Payments', to: ROUTES.payment.getPath(apartmentId) },
  ]

  const SIDEBAR_SUPPLY_LIST: Array<SidebarMenu> = [
    { icon: <Package size={16} />, label: 'Supplies', to: ROUTES.supplyList.getPath(apartmentId) },
  ]

  // sidebar meter reading
  const SIDEBAR_METER_READING: Array<SidebarMenu> = [
    { icon: <Zap size={16} />, label: 'Meter Reading', to: ROUTES.meterReadingList.getPath(apartmentId) },
  ]
  const SIDEBAR_TENANTS_MANAGEMENT: Array<SidebarMenu> = [
    { icon: <BookUser size={16} />, label: 'Tenants Management', to: ROUTES.tenant.getPath(apartmentId) },
  ]
  // sidebar reports
  const SIDEBAR_COLLAPSE_ROOMS_REPORT: Array<SidebarMenu> = [
    { label: 'Electric & Water Report', to: ROUTES.electricWaterReport.getPath(apartmentId) },
  ]

  // sidebar invoices
  const SIDEBAR_COLLAPSE_ITEMS: Array<SidebarMenu> = [
    { label: 'Adhoc Invoices', to: ROUTES.normalInvoice.getPath(apartmentId) },
    { label: 'Monthly Rental Invoices', to: ROUTES.monthlyInvoice.getPath(apartmentId) },
    { label: 'Overdue Adhoc Invoices', to: ROUTES.overdueInvoice.getPath(apartmentId) },
    // { label: 'Service Invoices', to: ROUTES.serviceInvoice.getPath(apartmentId) },
  ]

  // sidebar maintenance
  const SIDEBAR_MAINTENANCE: Array<SidebarMenu> = [
    { icon: <Wrench size={16} />, label: 'Maintenance', to: ROUTES.maintenance.getPath(apartmentId) },
  ]

  // sidebar bottom items (static)
  const SIDEBAR_BOTTOM_ITEMS: Array<SidebarMenu> = [
    { icon: <Settings size={16} />, label: 'Apartment Settings', to: ROUTES.apartmentSetting.getPath(apartmentId) },
  ]

  const SIDEBAR_ALL_APARTMENTS: Array<SidebarMenu> = [
    { icon: <Table size={16} />, label: 'All Apartments', to: ROUTES.allApartment.path },
  ]

  return {
    topNav: [
      {
        type: 'item',
        topic: 'All Apartments',
        icon: <Table size={16} />,
        menu: SIDEBAR_ALL_APARTMENTS,
      },
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
        title: 'Payments',
        icon: <FileSpreadsheet size={16} />,
        menu: SIDEBAR_PAYMENT,
      },
      {
        type: 'item',
        title: 'All Room',
        icon: <Table size={16} />,
        menu: SIDEBAR_ALL_ROOMS,
      },
      {
        type: 'item',
        title: 'Supply List',
        icon: <Zap size={16} />,
        menu: SIDEBAR_SUPPLY_LIST,
      },
      {
        type: 'item',
        icon: <Table size={16} />,
        menu: SIDEBAR_METER_READING,
      },
      {
        type: 'collapsible',
        title: 'Reports',
        icon: <FileText size={16} />,
        menu: SIDEBAR_COLLAPSE_ROOMS_REPORT,
      },
      {
        type: 'item',
        title: 'Maintenance',
        icon: <Wrench size={16} />,
        menu: SIDEBAR_MAINTENANCE,
      },
      {
        type: 'item',
        title: 'Tenants Management',
        icon: <Wrench size={16} />,
        menu: SIDEBAR_TENANTS_MANAGEMENT,
      },
      {
        type: 'item',
        title: 'Settings',
        icon: <Settings size={16} />,
        menu: SIDEBAR_BOTTOM_ITEMS,
      },
    ],
    bottomNav: [],
  }
}
