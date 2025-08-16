import { Slot } from '@radix-ui/react-slot'
import { useMemo } from 'react'

import type { IButtonProps, IButtonVariants, ICompVariantConfig, ISkeletonProps } from '@/types'
import { tv } from '@/utilities'

import { Skeleton } from './Skeleton'

const MAP_SKELETON_SIZE: Record<IButtonVariants['size'], ISkeletonProps['size']> = {
  default: 'md',
  sm: 'sm',
}

const buttonVariants: ICompVariantConfig<IButtonVariants> = tv({
  base: 'border-theme-primary text-secondary disabled:bg-button-disabled disabled:text-disabled box-border whitespace-nowrap rounded-md border transition-colors hover:cursor-pointer focus-visible:outline-none disabled:pointer-events-none disabled:border-none disabled:border-transparent data-[disabled=true]:pointer-events-none',
  variants: {
    block: {
      true: 'block w-full',
      false: 'inline-block w-fit',
    },
    variant: {
      primary: 'bg-theme-primary hover:bg-theme-primary-400 text-theme-white',
      secondary: 'text-theme-primary bg-theme-white hover:bg-theme-primary-400 hover:text-secondary',
      vanilla: 'hover:bg-theme-white/10 border-transparent',
      outline: 'text-theme-primary hover:bg-theme-primary-400 hover:text-secondary bg-transparent',
      error: 'text-theme-white bg-theme-error hover:bg-theme-error-400 border-transparent',
    },
    size: {
      default: '!text-heading-5 h-11 px-7 py-3',
      sm: '!text-heading-6 h-8 rounded-lg px-7 py-2',
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
