import type { HTMLAttributes } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import type { SidebarNavMenu } from '@/types'
import { cn } from '@/utilities'

type ISidebarItemProps = {
  onClose: () => void
  sidebarItem: SidebarNavMenu
} & HTMLAttributes<HTMLAnchorElement>

const SidebarItem = ({ onClose, className, sidebarItem, ...props }: ISidebarItemProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  return (
    <NavLink
      to={sidebarItem.to(apartmentId)}
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
      {sidebarItem.icon}
      {sidebarItem.label}
    </NavLink>
  )
}

export default SidebarItem
