import type { HTMLAttributes, ReactElement, RefAttributes } from 'react'

export type IPopoverVariants = {
  variant: 'default'
}

export type IPopoverHandle = {
  close: () => void
  open: () => void
}

export interface IPopoverProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'children'>,
    RefAttributes<IPopoverHandle>,
    Partial<IPopoverVariants> {
  onAfterClosed?: () => void
  onAfterOpened?: () => void
  placement?: 'top' | 'right' | 'bottom' | 'left'
  trigger?: ReactElement
}
