import { PackageOpen } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/utilities'

type IPageTableEmptyProps = {
  message?: string
  description?: string
  icon?: ReactNode
  className?: string
}
const PageTableEmpty = ({
  message = 'No data to show right now.',
  description = 'Everything looks quiet here — try again later or check your filters.',
  icon = <PackageOpen size={35} />,
  className = '',
}: IPageTableEmptyProps) => {
  return (
    <div
      className={cn('bg-theme-light flex h-60 flex-col items-center justify-center gap-y-2 rounded-lg p-5', className)}
    >
      <div className="bg-theme-secondary-200 rounded p-2">{icon}</div>
      <div>
        <h4 className="text-center">{message}</h4>
        <p className="text-theme-secondary text-body-2 text-center">{description}</p>
      </div>
    </div>
  )
}

export default PageTableEmpty
