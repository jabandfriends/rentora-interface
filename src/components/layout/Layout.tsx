import { useCallback, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useDeviceWatcher, useRentoraApiUser } from '@/hooks'

import { LoadingPage } from '../ui'
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

  const { data: userData, isLoading } = useRentoraApiUser()
  const setSidebar = useCallback(() => {
    if (toggleRef.current) return
    toggleRef.current = true
    setSidebarOpen((prevOpen) => !prevOpen)
    setTimeout(() => {
      toggleRef.current = false
    }, 300)
  }, [])

  useDeviceWatcher()
  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="relative min-h-screen">
      {isSidebar && <Sidebar userData={userData} isOpen={sidebarOpen} onClose={setSidebar} />}

      <OutletWrapper isSidebar={isSidebar}>
        {isNavbar && (
          <NavBar userData={userData} sidebarOpen={sidebarOpen} onSidebarToggle={setSidebar} isSidebar={isSidebar} />
        )}
        <div className="mt-16">
          <Outlet />
        </div>
      </OutletWrapper>
    </div>
  )
}

export default Layout
