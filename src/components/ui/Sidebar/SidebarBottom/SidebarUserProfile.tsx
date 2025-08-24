import { EllipsisVertical, LogOut, Settings, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'

const SidebarUserProfile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hover:bg-theme-night-800/15 flex cursor-pointer items-center justify-between gap-x-3 rounded-lg px-1 py-1">
          <div className="flex items-center gap-x-2">
            <div className="flex size-8 items-center justify-center rounded-lg border">
              <User className="text-theme-primary size-4" />
            </div>
            <div className="text-theme-night-300 text-start">
              <h5>John Doe</h5>
              <p className="text-body-3 text-theme-secondary">john@example.com</p>
            </div>
          </div>

          <EllipsisVertical size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-62 flex flex-col" align="end" side="right">
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
  )
}

export default SidebarUserProfile
