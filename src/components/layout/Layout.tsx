import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useDeviceWatcher } from '@/hooks'

import NavBar from './Navbar'
import { OutletWrapper } from './OutletWrapper'
import Sidebar from './Sidebar'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // set sidebar open
  const setSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen)
  }, [sidebarOpen])

  useDeviceWatcher()
  return (
    <div className="relative min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={setSidebar} />
      <NavBar onSidebarToggle={setSidebar} />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </div>
  )
}

export default Layout
