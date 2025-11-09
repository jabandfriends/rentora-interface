import { Content, List, Root, Trigger } from '@radix-ui/react-tabs'
import type { ComponentProps } from 'react'

import { cn } from '@/utilities'

function Tabs({ className, ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />
}

function TabsList({ className, ...props }: ComponentProps<typeof List>) {
  return (
    <List
      data-slot="tabs-list"
      className={cn('bg-theme-light inline-flex h-9 w-fit items-center justify-center rounded-lg p-1', className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:border-ring data-[state=active]:bg-theme-primary-100 data-[state=active]:text-theme-primary-600 focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-normal duration-100 focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-semibold [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: ComponentProps<typeof Content>) {
  return <Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
