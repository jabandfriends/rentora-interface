import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useDeviceWatcher } from '@/hooks'

import NavBar from './Navbar'
import { OutletWrapper } from './OutletWrapper'
import Sidebar from './Sidebar'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useDeviceWatcher()
  return (
    <div className="relative min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <NavBar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </div>
  )
}

export default Layout
