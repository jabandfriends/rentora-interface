import { LogOut, Menu, Settings, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'

const NavBar = ({ onSidebarToggle }: { onSidebarToggle: () => void }) => {
  // hooks

  return (
    <header className="bg-theme-white border-theme-night-600 sticky top-0 z-30 border-b shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left button */}
        <button onClick={onSidebarToggle} className="flex cursor-pointer items-center">
          <Menu size={20} />
        </button>

        <div className="flex-1 text-center">
          <h4 className="text-heading-4 desktop:text-heading-4 text-theme-gray-50 font-medium">
            อพาร์ตเมนต์ : Testing Apartment
          </h4>
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
