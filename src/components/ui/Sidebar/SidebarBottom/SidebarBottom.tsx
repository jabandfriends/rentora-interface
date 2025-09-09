import type { HTMLAttributes } from 'react'
import { useParams } from 'react-router-dom'

import SidebarUserProfile from '@/components/ui/Sidebar/SidebarBottom/SidebarUserProfile'
import { SidebarItem, SidebarItemCollapse } from '@/components/ui/Sidebar/SidebarNavigation'
import { getSidebarItems } from '@/constants'
import type { SidebarNavMenu } from '@/types'
import { cn } from '@/utilities'

type ISidebarBottomProps = {
  onClose: () => void
} & HTMLAttributes<HTMLDivElement>

const SidebarBottom = ({ onClose, className, ...props }: ISidebarBottomProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const SIDEBAR_BOTTOM_ITEMS_MENU = getSidebarItems(apartmentId)
  return (
    <div {...props} className={cn('absolute bottom-0 left-0 right-0', className)}>
      <nav className="flex flex-col gap-y-2 p-4 py-2">
        {SIDEBAR_BOTTOM_ITEMS_MENU?.bottomNav?.map((item: SidebarNavMenu, index: number) => {
          if (item.type === 'item') {
            return (
              <div className="space-y-1" key={`sidebar-item-${item.menu}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItem menu={item.menu} onClose={onClose} />
              </div>
            )
          }
          if (item.type === 'collapsible') {
            return (
              <div key={`sidebar-item-collapse-${item.menu}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItemCollapse title={item.title} icon={item.icon} menu={item.menu} onClose={onClose} />
              </div>
            )
          }
        })}
        <SidebarUserProfile />
      </nav>
    </div>
  )
}

export default SidebarBottom
