import { FileMinus2, Home } from 'lucide-react'
import type { ReactNode } from 'react'

import { ROUTES } from '@/constants'

type SidebarItem = {
  icon: ReactNode
  label: string
  to: string
}
export const menuItems: Array<SidebarItem> = [
  { icon: <Home />, label: 'Dashboard', to: ROUTES.home.path },
  { icon: <FileMinus2 />, label: 'Invoices', to: ROUTES.normalInvoice.path },
]
