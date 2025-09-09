import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type ISidebarBodyProps = PropsWithChildren<{ isOpen: boolean; onClose: () => void }> & HTMLAttributes<HTMLDivElement>

const SidebarBody = ({ children, className, isOpen, onClose, ...props }: ISidebarBodyProps) => {
  return (
    <>
      <div
        className={cn(
          'bg-theme-white desktop:static desktop:translate-x-0 fixed left-0 top-0 z-50 h-screen w-64 py-2 duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div {...props} className={cn('flex h-full flex-col gap-y-2 overflow-y-auto', className)}>
          {children}
        </div>
      </div>
      {isOpen && <div className="desktop:hidden bg-theme-night/80 fixed inset-0 z-40" onClick={onClose} />}
    </>
  )
}

export default SidebarBody
