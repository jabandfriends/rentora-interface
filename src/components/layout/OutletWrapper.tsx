import type { PropsWithChildren } from 'react'

import { cn } from '@/utilities'

export const OutletWrapper = ({
  children,
  isSidebar,
  isNavbar,
}: PropsWithChildren<{ isSidebar: boolean; isNavbar: boolean }>) => {
  return (
    <div
      className={cn('min-h-[calc(100dvh-var(--header-height))] flex-col overflow-y-auto', [
        isNavbar && 'mt-16',
        isSidebar && 'desktop:ml-64',
      ])}
    >
      {children}
    </div>
  )
}
