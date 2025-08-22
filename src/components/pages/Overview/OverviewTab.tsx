import { Card } from '@/components/common'
import { RentChart } from '@/components/pages/Overview/Chart'

const OverviewTab = () => {
  return (
    <div className="desktop:flex-row flex flex-col gap-8 rounded-2xl">
      {/* Chart */}
      <RentChart />
      {/* Stats */}
      <div className="flex flex-1 flex-col gap-8">
        <Card className="rounded-2xl px-8 py-6">
          <div>
            <h3>July 2024</h3>
            <p className="text-theme-secondary">Monthly rent</p>
          </div>
          <h2 className="text-theme-success">฿1,000</h2>
        </Card>
        <Card className="h-full rounded-2xl px-8 py-6">
          <div>
            <h3>Profit</h3>
            <p className="text-theme-secondary">Monthly profit</p>
          </div>
          <h2 className="text-theme-success">฿1,000</h2>
        </Card>
      </div>
    </div>
  )
}

export default OverviewTab
