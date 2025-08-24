import type { ButtonHTMLAttributes, RefAttributes } from 'react'

type IButtonVariants = {
  variant: 'primary' | 'secondary' | 'vanilla' | 'outline' | 'error' | 'outlineSecondary' | 'link' | 'ghost'
  size: 'default' | 'sm' | 'icon'
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
