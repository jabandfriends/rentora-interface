import {
  Content,
  Group,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  SelectIcon,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/utilities'

function Select({ ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot="select" {...props} />
}

function SelectGroup({ ...props }: ComponentProps<typeof Group>) {
  return <Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: ComponentProps<typeof Value>) {
  return <Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: ComponentProps<typeof Trigger> & {
  size?: 'sm' | 'default'
}) {
  return (
    <Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "focus-visible:border-ring ring-theme-primary focus-visible:ring-theme-primary focus-visible:ring-ring/50 aria-invalid:ring-theme-error/20 dark:aria-invalid:ring-theme-error/40 aria-invalid:border-theme-error shadow-xs bg-theme-light border-theme-secondary-300 flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md border px-3 py-5 outline-none transition-[color,box-shadow] focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <SelectIcon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectIcon>
    </Trigger>
  )
}

function SelectContent({ className, children, position = 'popper', ...props }: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        data-slot="select-content"
        className={cn(
          'border-theme-secondary-300 bg-theme-light data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md',
          [
            position === 'popper' &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          ],
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  )
}

function SelectLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return <Label data-slot="select-label" className={cn('text-heading-5 px-2 py-1.5', className)} {...props} />
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof Item>) {
  return (
    <Item
      data-slot="select-item"
      className={cn(
        "focus:bg-theme-secondary-200/60 outline-hidden *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 text-body-2 relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <ItemIndicator>
          <CheckIcon className="size-4" />
        </ItemIndicator>
      </span>
      <ItemText>{children}</ItemText>
    </Item>
  )
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }: ComponentProps<typeof ScrollUpButton>) {
  return (
    <ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </ScrollUpButton>
  )
}

function SelectScrollDownButton({ className, ...props }: ComponentProps<typeof ScrollDownButton>) {
  return (
    <ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
