import type { HTMLAttributes } from 'react'

import SidebarUserProfile from '@/components/ui/Sidebar/SidebarBottom/SidebarUserProfile'
import { SidebarItem, SidebarItemCollapse } from '@/components/ui/Sidebar/SidebarNavigation'
import { SIDEBAR_BOTTOM_ITEMS_MENU } from '@/constants'
import type { SidebarNavMenu } from '@/types'
import { cn } from '@/utilities'

type ISidebarBottomProps = {
  onClose: () => void
} & HTMLAttributes<HTMLDivElement>

const SidebarBottom = ({ onClose, className, ...props }: ISidebarBottomProps) => {
  return (
    <div {...props} className={cn('absolute bottom-0 left-0 right-0', className)}>
      <nav className="flex flex-col gap-y-2 p-4 py-2">
        {SIDEBAR_BOTTOM_ITEMS_MENU?.map((item: SidebarNavMenu, index: number) => {
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
        <SidebarUserProfile />
      </nav>
    </div>
  )
}

export default SidebarBottom
