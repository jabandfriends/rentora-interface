import { SidebarBody, SidebarBottom, SidebarNavigation } from '@/components/ui'

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <SidebarBody isOpen={isOpen} onClose={onClose}>
      {/* <SidebarHeader onClose={onClose} title="Rentora" /> */}
      <SidebarNavigation onClose={onClose} />
      <SidebarBottom onClose={onClose} />
    </SidebarBody>
  )
}
export default Sidebar
