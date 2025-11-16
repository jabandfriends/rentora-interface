import type { SetStateAction } from 'jotai'
import { ChevronDown } from 'lucide-react'
import { type Dispatch, type HTMLAttributes, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/feature'
import type { SidebarCollapsible } from '@/types'
import { cn } from '@/utilities'

type ISidebarItemCollapseProps = {
  onClose: () => void
  sidebarItem: SidebarCollapsible
} & HTMLAttributes<HTMLDivElement>

const SidebarItemCollapse = ({ onClose, className, sidebarItem, ...props }: ISidebarItemCollapseProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [isNavLinkShow, setNavlinkShow]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  return (
    <Collapsible
      open={isNavLinkShow}
      onOpenChange={setNavlinkShow}
      className={cn('flex flex-col gap-y-1', className)}
      {...props}
    >
      <CollapsibleTrigger className="text-body-2 duration-20 hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50 flex items-center justify-between gap-x-2 rounded-lg px-2 py-1.5">
        {/* label + icon */}
        <div className="flex items-center gap-x-2">
          {sidebarItem.icon}
          {sidebarItem.label}
        </div>
        {/* icon */}

        <ChevronDown size={16} className={cn('-rotate-90 duration-150', [isNavLinkShow && 'rotate-0'])} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4">
        <ul className="border-theme-secondary-200 space-y-1 border-l">
          {sidebarItem.collapsibleMenu?.map((item, index) => {
            return (
              <div className="ml-1" key={`sidebar-item-collapse-${item.label}-${index}`}>
                <NavLink
                  key={'sidebar-item-collapse-' + index}
                  to={item.to(apartmentId)}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-x-2 rounded-lg px-2 py-1.5 duration-200',
                      isActive
                        ? 'border-theme-primary-600 bg-theme-primary-50 text-theme-primary-700 border-r-2'
                        : 'hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50',
                    )
                  }
                >
                  <span className="text-body-2">{item.label}</span>
                </NavLink>
              </div>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SidebarItemCollapse
