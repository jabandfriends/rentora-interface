import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/utilities'

const badgeVariants = tv({
  base: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-theme-primary/20 dark:aria-invalid:ring-theme-primary/40 aria-invalid:border-theme-error text-body-3 duration-400 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-2xl border px-3 py-1 font-medium focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
  variants: {
    variant: {
      default: 'bg-theme-primary-200 text-theme-primary-600 [a&]:hover:bg-theme-primary/90 border-transparent',
      secondary: 'bg-theme-secondary-200 [a&]:hover:bg-theme-secondary/90 border-transparent',
      success: 'bg-theme-success-200 text-theme-success-600 [a&]:hover:bg-theme-success/90 border-transparent',
      error: 'bg-theme-error-200 text-theme-error-600 [a&]:hover:bg-theme-error/90 border-transparent',
      warning: 'bg-theme-warning-200 text-theme-warning-600 [a&]:hover:bg-theme-warning/90 border-transparent',
      outline: 'border-theme-secondary-300 [a&]:hover:bg-theme-secondary/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
