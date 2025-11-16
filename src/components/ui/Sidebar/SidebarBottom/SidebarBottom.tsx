import type { HTMLAttributes } from 'react'
import { useParams } from 'react-router-dom'

import { SidebarItem, SidebarItemCollapse } from '@/components/ui/Sidebar/SidebarNavigation'
import { getSidebarItems } from '@/constants'
import type { TENANT_ROLE } from '@/enum'
import type { IUserAuthenticationResponse, Maybe, SidebarItems } from '@/types'
import { cn } from '@/utilities'

import SidebarUserProfile from './SidebarUserProfile'

type ISidebarBottomProps = {
  onClose: () => void
  userData: Maybe<IUserAuthenticationResponse>
  currentUserRole?: Maybe<TENANT_ROLE>
} & HTMLAttributes<HTMLDivElement>

const SidebarBottom = ({ onClose, className, userData, currentUserRole, ...props }: ISidebarBottomProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { bottomNav } = getSidebarItems(apartmentId, currentUserRole)
  return (
    <div {...props} className={cn('absolute bottom-0 left-0 right-0', className)}>
      <nav className="flex flex-col gap-y-2 p-4 py-2">
        {bottomNav?.map((item: SidebarItems, index: number) => {
          if (item.type === 'item') {
            return (
              <div className="space-y-1" key={`sidebar-item-${item.label}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItem sidebarItem={item} onClose={onClose} />
              </div>
            )
          }
          if (item.type === 'collapsible') {
            return (
              <div key={`sidebar-item-collapse-${item.topic}-${index}`}>
                {item.topic && <h6 className="text-theme-secondary px-2 font-semibold">{item.topic}</h6>}
                <SidebarItemCollapse sidebarItem={item} onClose={onClose} />
              </div>
            )
          }
        })}
        <SidebarUserProfile currentUserRole={currentUserRole} userData={userData} className="desktop:hidden" />
      </nav>
    </div>
  )
}

export default SidebarBottom
