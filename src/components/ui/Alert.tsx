import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

import { cn, tv } from '@/utilities'

const alertVariants = tv({
  base: 'text-body-2 relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  variants: {
    variant: {
      default: 'bg-theme-primary-100 border-theme-primary text-theme-primary',
      destructive: 'text-theme-error bg-card *:data-[slot=alert-description]:text-theme-error/90 [&>svg]:text-current',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Alert({ className, variant, ...props }: ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-theme-secondary text-body-2 col-start-2 grid justify-items-start gap-1 [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertTitle }
