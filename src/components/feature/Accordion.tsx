import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/utilities'

function Accordion({ ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: ComponentProps<typeof Item>) {
  return (
    <Item
      data-slot="accordion-item"
      className={cn('border-theme-gray-200 border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof Trigger>) {
  return (
    <Header className="flex">
      <Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 text-body-2 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-theme-gray-700 pointer-events-none size-4 shrink-0 translate-y-0.5 duration-200" />
      </Trigger>
    </Header>
  )
}

function AccordionContent({ className, children, ...props }: ComponentProps<typeof Content>) {
  return (
    <Content data-slot="accordion-content" className="accordion-content text-body-2 overflow-hidden" {...props}>
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
