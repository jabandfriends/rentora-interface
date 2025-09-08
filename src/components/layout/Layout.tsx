import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useDeviceWatcher } from '@/hooks'

import NavBar from './Navbar'
import { OutletWrapper } from './OutletWrapper'
import Sidebar from './Sidebar'

type ILayoutProps = {
  isNavbar?: boolean
  isSidebar?: boolean
}
const Layout = ({ isNavbar = true, isSidebar = true }: ILayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // set sidebar open
  const setSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen)
  }, [sidebarOpen])

  useDeviceWatcher()
  return (
    <div className="relative min-h-screen">
      <>{isNavbar && <NavBar onSidebarToggle={setSidebar} isSidebar={isSidebar} />}</>
      <OutletWrapper>
        {isSidebar && <Sidebar isOpen={sidebarOpen} onClose={setSidebar} />}
        <Outlet />
      </OutletWrapper>
    </div>
  )
}

export default Layout
