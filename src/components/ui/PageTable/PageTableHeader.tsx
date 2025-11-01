import type { ReactNode } from 'react'

import { StatsCard } from '@/components/ui'
import type { IStatsCardProps } from '@/types'

type IPageTableHeaderProps = {
  title: string
  description: string
  stats?: Array<IStatsCardProps>
  actionButton?: ReactNode
  isLoading?: boolean
}

const PageTableHeader = ({ title, description, stats, actionButton, isLoading }: IPageTableHeaderProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="desktop:px-0 desktop:flex-row desktop:items-center flex flex-col justify-between gap-1">
        <div>
          <div className="desktop:flex-row flex flex-col justify-between gap-y-2">
            <h3 className="font-semibold">{title}</h3>
          </div>
          <p className="text-body-2 text-theme-secondary">{description}</p>
        </div>

        {actionButton}
      </div>

      {/* Stats Card */}
      {stats && (
        <div className="desktop:flex-row desktop:justify-start desktop:flex grid grid-cols-2 flex-col items-center justify-center gap-3">
          {stats.map((item: IStatsCardProps) => (
            <StatsCard key={item.title} isLoading={isLoading} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PageTableHeader
