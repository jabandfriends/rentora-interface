import { type HTMLAttributes, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { getSidebarItems } from '@/constants'
import type { TENANT_ROLE } from '@/enum'
import type { Maybe, SidebarItems } from '@/types'
import { cn } from '@/utilities'

import SidebarItem from './SidebarItem'
import SidebarItemCollapse from './SidebarItemCollapse'

type ISidebarNavigationProps = HTMLAttributes<HTMLDivElement> & {
  onClose: () => void
  currentUserRole?: Maybe<TENANT_ROLE>
}
const SidebarNavigation = ({ onClose, className, currentUserRole, ...props }: ISidebarNavigationProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { topNav }: { topNav: Array<SidebarItems> } = useMemo(
    () => getSidebarItems(apartmentId, currentUserRole),
    [apartmentId, currentUserRole],
  )

  return (
    <nav {...props} className={cn('flex flex-col gap-y-2 p-4 py-2', className)}>
      <ul className="space-y-1">
        {topNav.map((item: SidebarItems, index: number) => {
          if (item.type === 'item') {
            return (
              <li className="space-y-1" key={`sidebar-item-${item.label}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItem sidebarItem={item} onClose={onClose} />
              </li>
            )
          }
          if (item.type === 'collapsible') {
            return (
              <li key={`sidebar-item-collapse-${item.topic}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItemCollapse sidebarItem={item} onClose={onClose} />
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default SidebarNavigation
