import { OverviewBody, OverviewHeader } from '@/components/pages/Overview'

const Overview = () => {
  return (
    <div className="container mx-auto flex flex-col gap-y-5 py-5">
      <OverviewHeader />
      <OverviewBody />
    </div>
  )
}

export default Overview
