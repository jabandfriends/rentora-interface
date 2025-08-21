import { ChevronDown, User, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { menuItems } from '@/constants'
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
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-x-3">
            <div className="bg-theme-primary-600 flex size-8 items-center justify-center rounded-lg">
              <span className="text-theme-white text-heading-4">R</span>
            </div>
            <h4 className="text-theme-night-50">Rentora</h4>
          </div>
          <button
            className="hover:bg-theme-night-800 hover:text-theme-night-50 text-theme-night-400 cursor-pointer rounded-md p-2 lg:hidden"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              return (
                <NavLink
                  key={'sidebar-item-' + index}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'text-body-2 flex items-center rounded-lg px-4 py-3 duration-200',
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
          </ul>
        </nav>

        {/* User section at bottom */}
        <div className="border-theme-night-500 absolute bottom-0 left-0 right-0 border-t p-4">
          <div className="flex items-center gap-x-2">
            <div className="flex size-8 items-center justify-center rounded-full border">
              <User className="text-theme-gray-50 size-4" />
            </div>
            <div className="text-theme-night-300">
              <p className="text-body-2">John Doe</p>
              <p className="text-body-3">john@example.com</p>
            </div>
            <ChevronDown className="text-theme-gray-50 size-4" />
          </div>
        </div>
      </div>
    </>
  )
}
export default Sidebar
