import { EllipsisVertical, LogOut, User } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'
import { Badge, FieldEmpty } from '@/components/ui'
import { ROUTES } from '@/constants'
import type { TENANT_ROLE } from '@/enum'
import type { IUserAuthenticationResponse, Maybe } from '@/types'

const SidebarUserProfile = ({
  userData,
  className,
  currentUserRole,
}: {
  userData: Maybe<IUserAuthenticationResponse>
  className?: string
  currentUserRole?: Maybe<TENANT_ROLE>
}) => {
  const userName: string = useMemo(() => {
    return userData?.firstName + ' ' + userData?.lastName
  }, [userData])
  // hooks
  const navigate: NavigateFunction = useNavigate()
  const handleLogout = useCallback(() => {
    navigate(ROUTES.auth.path)
  }, [navigate])

  const handleAccount = useCallback(() => {
    navigate(ROUTES.accountSetting.path)
  }, [navigate])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <div className="hover:bg-theme-night-800/15 flex cursor-pointer items-center justify-between gap-x-3 rounded-lg px-1 py-1">
          <div className="flex items-center gap-x-2">
            <div className="border-theme-secondary-300 flex size-8 items-center justify-center rounded-lg border">
              <User className="text-theme-primary size-4" />
            </div>
            <div className="text-start">
              <div className="flex items-center gap-x-2">
                <h5>{userName}</h5>
                {currentUserRole && <Badge className="text-body-4 capitalize">{currentUserRole}</Badge>}
              </div>
              <p className="text-body-3 text-theme-secondary">{userData?.email ?? <FieldEmpty />}</p>
            </div>
          </div>

          <EllipsisVertical size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-62 flex flex-col" align="end" side="top">
        <DropdownMenuItem onClick={handleAccount}>
          <User className="text-theme-secondary-400" /> Account
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
