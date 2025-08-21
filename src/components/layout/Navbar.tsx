import { ChevronDown, Menu } from 'lucide-react'

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

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          <div className="bg-theme-night-600 flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-theme-gray-50 text-bodoy-2">JD</span>
          </div>
          <ChevronDown className="text-theme-gray-50 hidden h-4 w-4 md:block" />
        </div>
      </div>
    </header>
  )
}

export default NavBar
