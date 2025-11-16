import type { HTMLAttributes } from 'react'

import { SidebarBody, SidebarBottom, SidebarHeader, SidebarNavigation } from '@/components/ui'
import type { IUserAuthenticationResponse, Maybe } from '@/types'
import { cn } from '@/utilities'

type ISidebarProps = {
  isOpen: boolean
  onClose: () => void
  userData: Maybe<IUserAuthenticationResponse>
} & HTMLAttributes<HTMLDivElement>

const Sidebar = ({ isOpen, onClose, userData, className, ...props }: ISidebarProps) => {
  return (
    <SidebarBody className={cn('z-50 shadow', className)} isOpen={isOpen} onClose={onClose} {...props}>
      <SidebarHeader onClose={onClose} title="Rentora" />
      <SidebarNavigation onClose={onClose} />
      <SidebarBottom userData={userData} onClose={onClose} />
    </SidebarBody>
  )
}
export default Sidebar
