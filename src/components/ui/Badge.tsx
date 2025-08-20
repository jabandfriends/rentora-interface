import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/utilities'

const badgeVariants = tv({
  base: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-theme-primary/20 dark:aria-invalid:ring-theme-primary/40 aria-invalid:border-destructive text-body-4 duration-400 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-medium focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
  variants: {
    variant: {
      default: 'bg-theme-primary text-theme-white [a&]:hover:bg-theme-primary/90 border-transparent',
      secondary: 'bg-theme-secondary text-theme-white [a&]:hover:bg-theme-secondary/90 border-transparent',
      success: 'bg-theme-success text-theme-white [a&]:hover:bg-theme-success/90 border-transparent',
      error: 'bg-theme-error text-theme-white [a&]:hover:bg-theme-error/90 border-transparent',
      warning: 'bg-theme-warning text-theme-white [a&]:hover:bg-theme-warning/90 border-transparent',
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
