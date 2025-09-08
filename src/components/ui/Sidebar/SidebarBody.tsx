import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type ISidebarBodyProps = PropsWithChildren<{ isOpen: boolean; onClose: () => void }> & HTMLAttributes<HTMLDivElement>

const SidebarBody = ({ children, className, isOpen, onClose, ...props }: ISidebarBodyProps) => {
  return (
    <div>
      <div
        className={cn('desktop:static bg-theme-white desktop:translate-x-0 fixed z-50 h-full w-64 py-2 duration-200', [
          [isOpen ? 'translate-x-0' : '-translate-x-full'],
        ])}
      >
        <div {...props} className={cn(`inset-y-0 left-0 flex h-full flex-col gap-y-2`, className)}>
          {children}
        </div>
      </div>
      {isOpen && <div className="desktop:hidden bg-theme-night/80 fixed inset-0 z-40" onClick={onClose} />}
    </div>
  )
}

export default SidebarBody
