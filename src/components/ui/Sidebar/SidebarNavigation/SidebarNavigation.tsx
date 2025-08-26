import type { HTMLAttributes } from 'react'

import { SIDEBAR_ITEMS_MENU } from '@/constants'
import type { SidebarNavMenu } from '@/types'
import { cn } from '@/utilities'

import SidebarItem from './SidebarItem'
import SidebarItemCollapse from './SidebarItemCollapse'

type ISidebarNavigationProps = HTMLAttributes<HTMLDivElement> & {
  onClose: () => void
}
const SidebarNavigation = ({ onClose, className, ...props }: ISidebarNavigationProps) => {
  return (
    <nav {...props} className={cn('flex flex-col gap-y-2 p-4 py-2', className)}>
      <ul className="space-y-1">
        {SIDEBAR_ITEMS_MENU?.map((item: SidebarNavMenu, index: number) => {
          if (item.type === 'item') {
            return (
              <li className="space-y-1" key={`sidebar-item-${item.menu}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItem menu={item.menu} onClose={onClose} />
              </li>
            )
          }
          if (item.type === 'collapsible') {
            return (
              <li key={`sidebar-item-collapse-${item.menu}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItemCollapse title={item.title} icon={item.icon} menu={item.menu} onClose={onClose} />
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default SidebarNavigation
