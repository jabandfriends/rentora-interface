import { EllipsisVertical, LogOut, Settings, User } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'
import { ROUTES } from '@/constants'
import type { IUser } from '@/types'

const SidebarUserProfile = ({ userData }: { userData: IUser }) => {
  // hooks
  const navigate: NavigateFunction = useNavigate()
  const handleLogout = useCallback(() => {
    navigate(ROUTES.auth.path)
  }, [navigate])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hover:bg-theme-night-800/15 flex cursor-pointer items-center justify-between gap-x-3 rounded-lg px-1 py-1">
          <div className="flex items-center gap-x-2">
            <div className="flex size-8 items-center justify-center rounded-lg border">
              <User className="text-theme-primary size-4" />
            </div>
            <div className="text-theme-night-300 text-start">
              <h5>{userData?.firstName + ' ' + userData.lastName}</h5>
              <p className="text-body-3 text-theme-secondary">{userData.email}</p>
            </div>
          </div>

          <EllipsisVertical size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-62 flex flex-col" align="end" side="right">
        <DropdownMenuItem>
          <User className="text-theme-secondary-400" /> Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="text-theme-secondary-400" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-theme-error" onClick={handleLogout}>
          <LogOut className="text-theme-error" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SidebarUserProfile
