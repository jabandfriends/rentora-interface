import { StatsCard } from '@/components/ui'
import { STAT_CARDS } from '@/constants'

const OverviewHeader = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h2>Overview</h2>
        <p className="font-semibold">
          Welcome Back, <span className="text-theme-secondary font-normal">Thanakrit👋</span>
        </p>
      </div>

      {/* stats card */}
      <div className="desktop:flex-row flex flex-col items-center justify-center gap-x-12 gap-y-6">
        {STAT_CARDS.map((item, index) => (
          <StatsCard className="justify-start py-5" key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default OverviewHeader
