import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  type TooltipContentProps,
  type TooltipProps,
  type TooltipTriggerProps,
  Trigger,
} from '@radix-ui/react-tooltip'

import { cn } from '@/utilities'

const TooltipRoot = (props: TooltipProps) => {
  return (
    <Provider delayDuration={150}>
      <Root data-slot="tooltip" {...props} />
    </Provider>
  )
}

const TooltipTrigger = ({ className, ...props }: TooltipTriggerProps) => {
  return <Trigger data-slot="tooltip-trigger" className={cn('cursor-pointer', className)} {...props} />
}

const TooltipContent = ({ children, sideOffset = 0, className, ...props }: TooltipContentProps) => {
  return (
    <Portal>
      <Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'text-primary animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin) text-body-2 bg-theme-night-700 z-50 w-fit text-balance rounded-lg p-4',
          className,
        )}
        {...props}
      >
        {children}
        <Arrow className="bg-theme-night-700 fill-theme-night-700 z-50 size-4 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </Content>
    </Portal>
  )
}

export { TooltipContent, TooltipRoot, TooltipTrigger }
