import type { HTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'

import type { SidebarMenu, SidebarNavMenu } from '@/types'
import { cn } from '@/utilities'

type ISidebarItemProps = {
  onClose: () => void
} & HTMLAttributes<HTMLAnchorElement> &
  Pick<SidebarNavMenu, 'menu'>

const SidebarItem = ({ onClose, menu, className, ...props }: ISidebarItemProps) => {
  return menu?.map((item: SidebarMenu, index: number) => {
    return (
      <NavLink
        key={'sidebar-item-' + index}
        to={item.to}
        onClick={onClose}
        {...props}
        className={({ isActive }) =>
          cn(
            'text-body-2 flex items-center gap-x-2 rounded-lg px-2 py-1.5 duration-200',
            [
              isActive
                ? 'border-theme-primary-600 bg-theme-primary-50 text-theme-primary-700 border-r-2'
                : 'hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50',
            ],
            className,
          )
        }
      >
        {item.icon}
        {item.label}
      </NavLink>
    )
  })
}

export default SidebarItem
