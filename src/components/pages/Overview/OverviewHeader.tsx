import { StatsCard } from '@/components/ui'
import type { IStatsCardProps } from '@/types'

const STAT_CARDS: Array<IStatsCardProps> = [
  {
    title: 'Available room',
    count: '29',
  },
  {
    title: 'Unpaid Invoices',
    count: '56',
  },
  {
    title: 'Pending Repair',
    count: '38',
  },
]
const OverviewHeader = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h2>OverviewHeader</h2>
        <p className="font-semibold">
          Welcome Back, <span className="text-theme-secondary font-normal">Thanakrit👋</span>
        </p>
      </div>

      {/* stats card */}
      <div className="flex items-center justify-center gap-x-12">
        {STAT_CARDS.map((item, index) => (
          <StatsCard className="justify-start py-5" key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default OverviewHeader
