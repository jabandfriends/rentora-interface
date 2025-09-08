import type { PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type IPageSectionProps = PropsWithChildren<{ className?: string }>
const PageSection = ({ children, className }: IPageSectionProps) => {
  return <div className={cn('desktop:px-0 container mx-auto px-4 py-5', className)}>{children}</div>
}

export default PageSection
