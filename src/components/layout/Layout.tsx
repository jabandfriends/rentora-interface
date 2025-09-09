import { useCallback, useRef, useState } from 'react'
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
  const toggleRef = useRef(false)

  const setSidebar = useCallback(() => {
    if (toggleRef.current) return
    toggleRef.current = true
    setSidebarOpen((prevOpen) => !prevOpen)
    setTimeout(() => {
      toggleRef.current = false
    }, 300)
  }, [])

  useDeviceWatcher()
  return (
    <div className="relative min-h-screen">
      <>{isNavbar && <NavBar sidebarOpen={sidebarOpen} onSidebarToggle={setSidebar} isSidebar={isSidebar} />}</>
      <OutletWrapper>
        {isSidebar && <Sidebar className="h-full" isOpen={sidebarOpen} onClose={setSidebar} />}
        <Outlet />
      </OutletWrapper>
    </div>
  )
}

export default Layout
