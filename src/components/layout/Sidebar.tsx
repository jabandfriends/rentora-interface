import { EllipsisVertical, FileMinus2, LogOut, Settings, User, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/feature'
import { ROUTES, SIDEBAR_ITEMS } from '@/constants'
import { cn } from '@/utilities'

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="bg-theme-night/80 fixed inset-0 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(`bg-theme-white fixed inset-y-0 left-0 z-50 flex w-64 flex-col gap-y-2 duration-300 lg:static`, [
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ])}
      >
        {/* Sidebar Header */}
        <div className="hover:bg-theme-night-800/20 border-theme-secondary-300 flex h-16 cursor-pointer items-center justify-between border-b px-4 duration-200">
          <div className="flex items-center gap-x-3">
            <div className="bg-theme-primary-600 flex size-8 items-center justify-center rounded-lg">
              <h4 className="text-theme-white">R</h4>
            </div>
            <h4>Rentora</h4>
          </div>
          <button
            className="hover:bg-theme-night-800/20 hover:text-theme-night-50 text-theme-night-400 desktop:hidden cursor-pointer rounded-md p-2"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-y-2 p-4 py-2">
          <h6 className="text-theme-secondary px-2 font-semibold">Dashboard</h6>

          <ul className="space-y-1">
            {SIDEBAR_ITEMS.map((item, index) => {
              return (
                <NavLink
                  key={'sidebar-item-' + index}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'text-body-2 flex items-center gap-x-2 rounded-lg px-2 py-1.5 duration-200',
                      isActive
                        ? 'border-theme-primary-600 bg-theme-primary-50 text-theme-primary-700 border-r-2'
                        : 'hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50',
                    )
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              )
            })}
            <Collapsible className="flex flex-col gap-y-2">
              <CollapsibleTrigger
                className={cn(
                  'text-body-2 duration-20 hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50 flex items-center gap-x-2 rounded-lg px-2 py-1.5',
                )}
              >
                <FileMinus2 size={16} /> Invoices
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4">
                <ul className="space-y-1">
                  <NavLink
                    to={ROUTES.normalInvoice.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'text-body-2 flex items-center gap-x-2 rounded-lg px-2 py-1.5 duration-200',
                        isActive
                          ? 'border-theme-primary-600 bg-theme-primary-50 text-theme-primary-700 border-r-2'
                          : 'hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50',
                      )
                    }
                  >
                    Normal Invoice
                  </NavLink>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </ul>
        </nav>

        {/* User section at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <nav className="flex flex-col gap-y-2 p-4 py-2">
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'text-body-2 flex items-center gap-x-2 rounded-lg px-2 py-1.5 duration-200',
                  isActive
                    ? 'border-theme-primary-600 bg-theme-primary-50 text-theme-primary-700 border-r-2'
                    : 'hover:bg-theme-night-800/20 text-theme-night-50 hover:text-theme-gray-50',
                )
              }
            >
              <Settings size={16} />
              Settings
            </NavLink>

            {/* User section at bottom */}
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
          </nav>
        </div>
      </div>
    </>
  )
}
export default Sidebar
