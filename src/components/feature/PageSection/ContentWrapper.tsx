import type { PropsWithChildren } from 'react'

import { cn } from '@/utilities'

export const ContentWrapper = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        'desktop:w-360 desktop:px-30 desktop:py-10 relative flex w-full flex-row items-center justify-between gap-x-3 p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
