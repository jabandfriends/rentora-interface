import { BarChart3, ChevronDown, Home, Settings, User, X } from 'lucide-react'

import { cn } from '@/utilities'

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '#', active: true },
    { icon: User, label: 'Users', href: '#', active: false },
    { icon: BarChart3, label: 'Analytics', href: '#', active: false },
    { icon: Settings, label: 'Settings', href: '#', active: false },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="bg-theme-night/80 fixed inset-0 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(`bg-theme-white fixed inset-y-0 left-0 z-50 w-64 transform duration-300 lg:static`, [
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ])}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-x-3">
            <div className="bg-theme-primary-600 flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-theme-white text-heading-4">A</span>
            </div>
            <span className="text-heading-4 text-theme-night-50">Rentora</span>
          </div>
          <button
            className="hover:bg-theme-night-800 hover:text-theme-night-50 text-theme-night-400 cursor-pointer rounded-md p-2 lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className={cn(`text-body-2 flex items-center rounded-lg px-4 py-3 duration-200`, [
                      item.active
                        ? 'border-theme-primary-600 bg-theme-primary-50 text-theme-primary-700 border-r-2'
                        : 'hover:bg-theme-gray-900 text-theme-gray-50 hover:text-theme-gray-50',
                    ])}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User section at bottom */}
        <div className="bg-theme-gray-900/30 absolute bottom-0 left-0 right-0 border-t border-gray-600 p-4">
          <div className="flex items-center">
            <div className="bg-theme-gray-50 flex h-8 w-8 items-center justify-center rounded-full">
              <User className="text-theme-gray-50 h-4 w-4" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-theme-gray-50 text-body-2">John Doe</p>
              <p className="text-theme-gray-50 text-body-3">john@example.com</p>
            </div>
            <ChevronDown className="text-theme-gray-50 h-4 w-4" />
          </div>
        </div>
      </div>
    </>
  )
}
export default Sidebar
