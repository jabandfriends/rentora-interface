import { Corner, Root, ScrollAreaScrollbar, ScrollAreaThumb, Viewport } from '@radix-ui/react-scroll-area'
import type { ComponentProps } from 'react'

import { cn } from '@/utilities'

function ScrollArea({ className, children, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root data-slot="scroll-area" className={cn('relative', className)} {...props}>
      <Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px]"
      >
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  )
}

function ScrollBar({ className, orientation = 'vertical', ...props }: ComponentProps<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none select-none p-px transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaThumb data-slot="scroll-area-thumb" className="bg-border relative flex-1 rounded-full" />
    </ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
