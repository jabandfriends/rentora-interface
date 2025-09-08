import { LogOut, Menu, Settings, User, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'
import { ROUTES } from '@/constants'

const NavBar = ({
  onSidebarToggle,
  isSidebar,
  sidebarOpen,
}: {
  onSidebarToggle: () => void
  isSidebar: boolean
  sidebarOpen: boolean
}) => {
  // hooks

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
          <div className="flex items-center gap-x-2">
            <Link className="flex items-center gap-x-2" to={ROUTES.allApartment.path}>
              <h5 className="bg-theme-primary text-theme-white flex size-8 items-center justify-center rounded-lg">
                R
              </h5>
              <h3 className="desktop:block hidden">Rentora</h3>
            </Link>
          </div>
        </div>

        {/* Right Profile*/}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="hover:bg-theme-night-800/15 flex cursor-pointer items-center space-x-4 rounded-lg px-2 py-1">
              <div className="bg-theme-night-600 flex size-8 items-center justify-center rounded-full">
                <span className="text-body-2">JD</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-62 flex flex-col" align="end">
            <div className="flex items-center gap-x-2 p-2">
              <div className="flex size-8 items-center justify-center rounded-lg border">
                <User className="text-theme-primary size-4" />
              </div>
              <div className="text-theme-night-300">
                <h5>John Doe</h5>
                <p className="text-body-3 text-theme-secondary">john@example.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="text-theme-secondary-400" /> Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="text-theme-secondary-400" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-theme-error">
              <LogOut className="text-theme-error" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default NavBar
