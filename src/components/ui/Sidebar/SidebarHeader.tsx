import { X } from 'lucide-react'
import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/utilities'

type ISidebarHeaderProps = HTMLAttributes<HTMLAnchorElement> & {
  onClose: () => void
  title: string
}
const SidebarHeader = ({ onClose, title, className, ...props }: ISidebarHeaderProps) => {
  return (
    <Link
      to="/"
      onClick={onClose}
      {...props}
      className={cn(
        'hover:bg-theme-night-800/20 border-theme-secondary-300 flex h-16 cursor-pointer items-center justify-between border-b px-4 duration-200',
        className,
      )}
    >
      <div className="flex items-center gap-x-3">
        <div className="bg-theme-primary-600 flex size-8 items-center justify-center rounded-lg">
          <h4 className="text-theme-white">R</h4>
        </div>
        <h4>{title}</h4>
      </div>
      <button
        className="hover:bg-theme-night-800/20 hover:text-theme-night-50 text-theme-night-400 desktop:hidden cursor-pointer rounded-md p-2"
        onClick={onClose}
      >
        <X className="size-5" />
      </button>
    </Link>
  )
}

export default SidebarHeader
