import { useCallback, useMemo, useRef, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

import { Spinner } from '@/components/common'
import type { TENANT_ROLE } from '@/enum'
import { useRentoraApiUser } from '@/hooks'
import type { IUserAuthenticationApartmentRole, Maybe } from '@/types'

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
  }> = useLoaderData()

  const userRole: Maybe<TENANT_ROLE> = useMemo(() => loaderData?.userRole ?? undefined, [loaderData])

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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      {isSidebar && (
        <Sidebar userData={userData} isOpen={sidebarOpen} onClose={setSidebar} currentUserRole={userRole} />
      )}
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
