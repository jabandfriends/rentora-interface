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
              <>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItem key={'sidebar-item-' + index} menu={item.menu} onClose={onClose} />
              </>
            )
          }
          if (item.type === 'collapsible') {
            return (
              <>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItemCollapse
                  title={item.title}
                  icon={item.icon}
                  key={'sidebar-item-collapse-' + index}
                  menu={item.menu}
                  onClose={onClose}
                />
              </>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default SidebarNavigation
