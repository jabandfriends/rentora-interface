import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type ISidebarBodyProps = PropsWithChildren<{ isOpen: boolean; onClose: () => void }> & HTMLAttributes<HTMLDivElement>

const SidebarBody = ({ children, className, isOpen, onClose, ...props }: ISidebarBodyProps) => {
  return (
    <>
      {isOpen && <div className="bg-theme-night/80 fixed inset-0 z-40" onClick={onClose} />}
      <div
        {...props}
        className={cn(
          `bg-theme-white fixed inset-y-0 left-0 z-50 flex w-64 flex-col gap-y-2 duration-300 lg:static`,
          [isOpen ? 'translate-x-0' : '-translate-x-full'],
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}

export default SidebarBody
