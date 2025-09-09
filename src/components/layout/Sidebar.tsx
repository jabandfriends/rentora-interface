import type { HTMLAttributes } from 'react'

import { SidebarBody, SidebarBottom, SidebarHeader, SidebarNavigation } from '@/components/ui'
import { cn } from '@/utilities'

type ISidebarProps = {
  isOpen: boolean
  onClose: () => void
} & HTMLAttributes<HTMLDivElement>

const Sidebar = ({ isOpen, onClose, className, ...props }: ISidebarProps) => {
  return (
    <SidebarBody className={cn(className)} isOpen={isOpen} onClose={onClose} {...props}>
      <SidebarHeader onClose={onClose} title="Rentora" />
      <SidebarNavigation onClose={onClose} />
      <SidebarBottom onClose={onClose} />
    </SidebarBody>
  )
}
export default Sidebar
