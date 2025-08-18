import { Indicator, Root } from '@radix-ui/react-progress'
import type { ComponentProps } from 'react'

import { cn } from '@/utilities'

function Progress({ className, value, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root
      data-slot="progress"
      className={cn('bg-theme-primary relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <Indicator
        data-slot="progress-indicator"
        className="bg-theme-primary h-full w-full flex-1 duration-300"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  )
}

export { Progress }
