import { Home } from 'lucide-react'
import type { ReactNode } from 'react'

import { ROUTES } from '@/constants'

type SidebarItem = {
  icon: ReactNode
  label: string
  to: string
}
export const SIDEBAR_ITEMS: Array<SidebarItem> = [
  { icon: <Home size={16} />, label: 'Dashboard', to: ROUTES.home.path },
]
