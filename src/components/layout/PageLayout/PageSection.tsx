import type { PropsWithChildren } from 'react'

import { cn } from '@/utilities'

type IPageSectionProps = PropsWithChildren<{ className?: string; middle?: boolean }>
const PageSection = ({ children, className, middle }: IPageSectionProps) => {
  return (
    <div
      className={cn('desktop:px-8 flex flex-col gap-y-5 px-4 py-5', className, [
        middle ? 'container mx-auto' : 'flex w-full',
      ])}
    >
      {children}
    </div>
  )
}

export default PageSection
