import type { ReactNode } from 'react'

import { StatsCard } from '@/components/ui'
import type { IStatsCardProps } from '@/types'

type IPageTableHeaderProps = {
  title: string
  description: string
  stats: Array<IStatsCardProps>
  actionButton?: ReactNode
  isLoading?: boolean
}

const PageTableHeader = ({ title, description, stats, actionButton, isLoading }: IPageTableHeaderProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="desktop:px-0 desktop:flex-row desktop:items-center flex flex-col justify-between gap-1 px-4">
        <div>
          <div className="desktop:flex-row flex flex-col justify-between gap-y-2">
            <h2>{title}</h2>
          </div>
          <p className="text-theme-secondary">{description}</p>
        </div>

        {actionButton}
      </div>

      {/* Stats Card */}
      <div className="desktop:flex-row desktop:justify-start desktop:flex grid grid-cols-2 flex-col items-center justify-center gap-3">
        {stats.map((item: IStatsCardProps) => (
          <StatsCard key={item.title} isLoading={isLoading} {...item} />
        ))}
      </div>
    </div>
  )
}

export default PageTableHeader
