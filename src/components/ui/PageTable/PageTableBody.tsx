import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type IPageTableBodyProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>
const PageTableBody = ({ children, className, ...props }: IPageTableBodyProps) => {
  return (
    <div className={cn('bg-theme-light rounded-lg p-5', className)} {...props}>
      {children}
    </div>
  )
}

export default PageTableBody
