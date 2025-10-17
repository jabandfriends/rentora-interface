import type { SetStateAction } from 'jotai'
import { ChevronDown, LogOut, Menu, User, X } from 'lucide-react'
import { type Dispatch, useCallback, useState } from 'react'
import { Link, type NavigateFunction, useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'
import { ROUTES } from '@/constants'
import type { IUser, Maybe } from '@/types'
import { cn } from '@/utilities'

const NavBar = ({
  onSidebarToggle,
  isSidebar,
  sidebarOpen,
  userData,
}: {
  onSidebarToggle: () => void
  isSidebar: boolean
  sidebarOpen: boolean
  userData: Maybe<IUser>
}) => {
  // hooks
  const navigate: NavigateFunction = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const handleSetDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])
  const handleLogout = useCallback(() => {
    navigate(ROUTES.auth.path)
  }, [navigate])

  return (
    <header className="bg-theme-white border-theme-night-600 sticky top-0 z-50 border-b shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-x-2">
          {/* Left button */}
          {isSidebar && (
            <button onClick={onSidebarToggle} className="desktop:hidden flex cursor-pointer items-center">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <div className="desktop:flex hidden items-center gap-x-2">
            <Link className="flex items-center gap-x-2" to={ROUTES.allApartment.path}>
              <h5 className="bg-theme-primary text-theme-white flex size-8 items-center justify-center rounded-lg">
                R
              </h5>
              <h3>Rentora</h3>
            </Link>
          </div>
        </div>

        {/* Right Profile*/}
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger onClick={handleSetDropdown}>
            <div className="hover:bg-theme-night-800/15 text-theme-secondary flex cursor-pointer items-center space-x-2 rounded-lg px-2 py-1 duration-200 focus:outline-none">
              <div className="bg-theme-night-600 flex size-8 items-center justify-center rounded-full">
                <span className="text-body-2">{userData?.firstName.charAt(0)}</span>
              </div>
              <p className="text-body-2">{userData?.firstName + ' ' + userData?.lastName}</p>

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
