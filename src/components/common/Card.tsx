import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type ICardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export const Card = ({ children, className, ...props }: ICardProps) => {
  return (
    <div
      className={cn('bg-theme-light duration-400 flex flex-col justify-center gap-y-2 px-6 hover:shadow-lg', className)}
      {...props}
    >
      {children}
    </div>
  )
}
