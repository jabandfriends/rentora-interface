import { Slot } from '@radix-ui/react-slot'
import { useMemo } from 'react'

import type { IButtonProps, IButtonVariants, ICompVariantConfig, ISkeletonProps } from '@/types'
import { tv } from '@/utilities'

import { Skeleton } from './Skeleton'

const MAP_SKELETON_SIZE: Record<IButtonVariants['size'], ISkeletonProps['size']> = {
  default: 'md',
  sm: 'sm',
  icon: 'md',
}

const buttonVariants: ICompVariantConfig<IButtonVariants> = tv({
  base: `focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-theme-error/20 dark:aria-invalid:ring-theme-error/40 aria-invalid:border-theme-error [&_svg:not([class*='size- '])]:size-4 text-body-2 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold outline-none duration-200 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  variants: {
    block: {
      true: 'block w-full',
      false: 'inline-block w-fit',
    },
    variant: {
      primary: 'bg-theme-primary hover:bg-theme-primary-400 text-theme-white shadow-sm duration-200 hover:shadow',
      secondary: 'bg-theme-secondary-400/40 hover:bg-theme-secondary-400/60 duration-200',
      warning: 'bg-theme-warning-500 text-theme-white hover:bg-theme-warning-500 hover:text-theme-white',
      outlineSecondary:
        'border-theme-secondary-400 hover:bg-theme-secondary-400 hover:text-theme-white border bg-transparent',
      vanilla: 'hover:bg-theme-white/10 border-transparent focus-visible:ring-[0px]',
      outline: 'text-theme-primary hover:bg-theme-primary hover:text-theme-white border bg-transparent',
      error: 'text-theme-white bg-theme-error hover:bg-theme-error-400 border-transparent',
      ghost: 'hover:bg-theme-secondary-200',
      link: 'text-theme-primary underline-offset-4 hover:underline',
    },
    size: {
      default: '!text-heading-5 h-11 px-7 py-3',
      sm: '!text-heading-6 h-8 rounded-lg px-7 py-2',
      icon: 'size-9',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
  compoundVariants: [
    {
      variant: 'vanilla',
      className: 'size-auto !p-0',
    },
  ],
})

export const Button = ({
  className,
  variant,
  size = 'default',
  block = false,
  asChild = false,
  loading = false,
  children,
  ...props
}: IButtonProps) => {
  const buttonClassName: string = useMemo<string>(
    (): string => buttonVariants({ block, variant, size, className }),
    [block, variant, size, className],
  )
  if (asChild) {
    return (
      <Slot className={buttonClassName} data-disabled={props.disabled || loading} {...props}>
        {children}
      </Slot>
    )
  }

  if (loading) {
    return <Skeleton size={MAP_SKELETON_SIZE[size]} />
  }

  return (
    <button className={buttonClassName} disabled={props.disabled || loading} {...props}>
      {children}
    </button>
  )
}
