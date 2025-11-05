import { useCallback, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { useDeviceWatcher, useRentoraApiUser } from '@/hooks'

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
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      {isSidebar && <Sidebar userData={userData} isOpen={sidebarOpen} onClose={setSidebar} />}
      {isNavbar && (
        <NavBar userData={userData} sidebarOpen={sidebarOpen} onSidebarToggle={setSidebar} isSidebar={isSidebar} />
      )}
      <OutletWrapper isNavbar={isNavbar} isSidebar={isSidebar}>
        <Outlet />
      </OutletWrapper>
    </div>
  )
}

export default Layout
