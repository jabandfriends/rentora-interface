import type { HTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/feature'
import type { SidebarNavMenu } from '@/types'
import { cn } from '@/utilities'

type ISidebarItemCollapseProps = {
  onClose: () => void
} & HTMLAttributes<HTMLDivElement> &
  Pick<SidebarNavMenu, 'title' | 'icon' | 'menu'>
const SidebarItemCollapse = ({ onClose, title, icon, menu, className, ...props }: ISidebarItemCollapseProps) => {
  return (
    <Collapsible className={cn('flex flex-col gap-y-2', className)} {...props}>
      <CollapsibleTrigger className="text-body-2 duration-20 hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50 flex items-center gap-x-2 rounded-lg px-2 py-1.5">
        {icon}
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4">
        <ul className="space-y-1">
          {menu?.map((item, index) => {
            return (
              <NavLink
                key={'sidebar-item-collapse-' + index}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'text-body-2 flex items-center gap-x-2 rounded-lg px-2 py-1.5 duration-200',
                    isActive
                      ? 'border-theme-primary-600 bg-theme-primary-50 text-theme-primary-700 border-r-2'
                      : 'hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50',
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SidebarItemCollapse
