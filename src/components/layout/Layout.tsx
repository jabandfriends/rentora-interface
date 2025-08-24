import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useDeviceWatcher } from '@/hooks'

import NavBar from './Navbar'
import { OutletWrapper } from './OutletWrapper'
import Sidebar from './Sidebar'

type ILayoutProps = {
  isNavbar?: boolean
}
const Layout = ({ isNavbar = true }: ILayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // set sidebar open
  const setSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen)
  }, [sidebarOpen])

  useDeviceWatcher()
  return (
    <div className="relative min-h-screen">
      {isNavbar && (
        <>
          <Sidebar isOpen={sidebarOpen} onClose={setSidebar} />
          <NavBar onSidebarToggle={setSidebar} />
        </>
      )}
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </div>
  )
}

export default Layout
