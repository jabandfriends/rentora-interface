import type { HTMLAttributes } from 'react'

import { SidebarBody, SidebarBottom, SidebarHeader, SidebarNavigation } from '@/components/ui'
import { APARTMENT_NAME } from '@/constants'
import type { TENANT_ROLE } from '@/enum'
import type { IUserAuthenticationResponse, Maybe } from '@/types'
import { cn } from '@/utilities'

type ISidebarProps = {
  isOpen: boolean
  onClose: () => void
  userData: Maybe<IUserAuthenticationResponse>
  currentUserRole?: Maybe<TENANT_ROLE>
} & HTMLAttributes<HTMLDivElement>

const Sidebar = ({ isOpen, onClose, userData, className, currentUserRole, ...props }: ISidebarProps) => {
  return (
    <SidebarBody className={cn('z-50 shadow', className)} isOpen={isOpen} onClose={onClose} {...props}>
      <SidebarHeader onClose={onClose} title={APARTMENT_NAME} />
      <SidebarNavigation onClose={onClose} currentUserRole={currentUserRole} />
      <SidebarBottom userData={userData} onClose={onClose} currentUserRole={currentUserRole} />
    </SidebarBody>
  )
}
export default Sidebar
