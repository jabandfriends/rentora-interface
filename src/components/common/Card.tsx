import type { ComponentProps, HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type ICardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

const Card = ({ children, className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        'bg-theme-light duration-400 flex flex-col justify-center gap-y-2 px-6 py-6 hover:shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('font-semibold leading-none', className)} {...props} />
}

function CardDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-theme-secondary text-body-2', className)} {...props} />
}

function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('[.border-t]:pt-6 flex items-center px-6', className)} {...props} />
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
