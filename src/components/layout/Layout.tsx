import { useCallback, useRef, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

import type { TENANT_ROLE } from '@/enum'
import type { IUserAuthenticationApartmentRole, IUserAuthenticationResponse, Maybe } from '@/types'

import NavBar from './Navbar'
import { OutletWrapper } from './OutletWrapper'
import Sidebar from './Sidebar'

type ILayoutProps = {
  isNavbar?: boolean
  isSidebar?: boolean
}
const Layout = ({ isNavbar = true, isSidebar = true }: ILayoutProps) => {
  const loaderData: Maybe<{
    apartmentRoles: Array<IUserAuthenticationApartmentRole>
    userRole: TENANT_ROLE
    id: string
    userData: Maybe<IUserAuthenticationResponse>
  }> = useLoaderData()

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

  return (
    <div>
      {isSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={setSidebar}
          currentUserRole={loaderData?.userRole}
          userData={loaderData?.userData}
        />
      )}
      {isNavbar && (
        <NavBar
          currentUserRole={loaderData?.userRole}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={setSidebar}
          isSidebar={isSidebar}
          userData={loaderData?.userData}
        />
      )}

      <OutletWrapper isNavbar={isNavbar} isSidebar={isSidebar}>
        <Outlet />
      </OutletWrapper>
    </div>
  )
}

export default Layout
