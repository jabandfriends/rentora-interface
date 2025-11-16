import type { SetStateAction } from 'jotai'
import { ChevronDown, LogOut, Menu, Settings, User, X } from 'lucide-react'
import { type Dispatch, useCallback, useMemo, useState } from 'react'
import { Link, type NavigateFunction, useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'
import { Avatar, AvatarFallback, Badge } from '@/components/ui'
import { APARTMENT_NAME, ROUTES } from '@/constants'
import type { TENANT_ROLE } from '@/enum'
import type { IUserAuthenticationResponse, Maybe } from '@/types'
import { cn } from '@/utilities'

const NavBar = ({
  onSidebarToggle,
  isSidebar,
  sidebarOpen,
  userData,
  currentUserRole,
}: {
  onSidebarToggle: () => void
  isSidebar: boolean
  sidebarOpen: boolean
  userData: Maybe<IUserAuthenticationResponse>
  currentUserRole: Maybe<TENANT_ROLE>
}) => {
  // hooks
  const navigate: NavigateFunction = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const handleSetDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const userName: string = useMemo(() => {
    return userData?.firstName + ' ' + userData?.lastName
  }, [userData])

  const handleLogout = useCallback(() => {
    navigate(ROUTES.auth.path)
  }, [navigate])
  const handleNavigateSetting = useCallback(() => {
    navigate(ROUTES.accountSetting.path)
  }, [navigate])

  return (
    <header
      className={cn(
        'bg-theme-white border-theme-secondary-300 fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b',
        [isSidebar && 'desktop:left-64'],
      )}
    >
      <div className="flex w-full items-center justify-between px-6">
        <div className="desktop:w-auto flex w-full items-center justify-between gap-x-2">
          {/* Left button */}
          {isSidebar && (
            <button onClick={onSidebarToggle} className="desktop:hidden flex cursor-pointer items-center">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <div className="desktop:hidden items-center gap-x-2">
            <Link className="flex items-center gap-x-2" to={ROUTES.allApartment.path}>
              <h5 className="bg-theme-primary text-theme-white flex size-8 items-center justify-center rounded-lg">
                {APARTMENT_NAME.charAt(0)}
              </h5>
              <h3>{APARTMENT_NAME}</h3>
            </Link>
          </div>
        </div>

        {/* Right Profile*/}
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="desktop:block hidden" onClick={handleSetDropdown}>
            <div className="hover:bg-theme-night-800/15 text-theme-secondary flex cursor-pointer items-center space-x-4 rounded-lg px-2 py-1 duration-200 focus:outline-none">
              <Avatar>
                <AvatarFallback>{userData?.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-body-2 flex flex-col">
                <p className="capitalize">{userName}</p>
                {currentUserRole && <Badge className="text-body-4 capitalize">{currentUserRole}</Badge>}
              </div>

              <div className={cn('text-theme-secondary-400 duration-200', [isDropdownOpen && 'rotate-180'])}>
                <ChevronDown size={16} />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-62 flex flex-col" align="end">
            <div className="flex items-center gap-x-2 p-2">
              <div className="flex size-8 items-center justify-center rounded-lg border">
                <User className="text-theme-primary size-4" />
              </div>
              <div className="text-theme-night-300">
                <h5>{userData?.firstName}</h5>
                <p className="text-body-3 text-theme-secondary">{userData?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="text-theme-secondary-400" /> Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleNavigateSetting}>
              <Settings className="text-theme-secondary-400" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-theme-error" onClick={handleLogout}>
              <LogOut className="text-theme-error" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default NavBar
