import type { ButtonHTMLAttributes, RefAttributes } from 'react'

type IButtonVariants = {
  variant: 'primary' | 'secondary' | 'vanilla' | 'outline' | 'error'
  size: 'default' | 'sm'
  block: boolean
}

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<IButtonVariants>,
    RefAttributes<HTMLButtonElement> {
  asChild?: boolean
  loading?: boolean
}

export type { IButtonProps, IButtonVariants }
