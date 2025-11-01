import type { PropsWithChildren } from 'react'

import { cn } from '@/utilities'

export const OutletWrapper = ({ children, isSidebar }: PropsWithChildren<{ isSidebar: boolean }>) => {
  return (
    <div className={cn('min-h-[calc(100dvh-var(--header-height))] overflow-y-auto', [isSidebar && 'desktop:ml-64'])}>
      {children}
    </div>
  )
}
