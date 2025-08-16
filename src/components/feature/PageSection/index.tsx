import type { PropsWithChildren } from 'react'

import { cn } from '@/utilities'

import { ContentWrapper } from './ContentWrapper'

type IPageSectionProps = PropsWithChildren<{ className?: string; contentClassName?: string }>

const PageSection = ({ children, className, contentClassName }: IPageSectionProps) => {
  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      <ContentWrapper className={contentClassName}>{children}</ContentWrapper>
    </div>
  )
}

export default PageSection
export type { IPageSectionProps }
