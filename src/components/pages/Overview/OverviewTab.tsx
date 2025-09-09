import { Card } from '@/components/common'
import { RentChart } from '@/components/pages/Overview/Chart'
import { Progress } from '@/components/ui'

const OverviewTab = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="desktop:flex-row h-110 flex w-3/4 flex-col gap-8 rounded-2xl">
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
          <Card className="h-full justify-start rounded-2xl px-8 py-6">
            <div>
              <h3>Occupancy Rate</h3>
              <p className="text-theme-secondary">Current room occupancy status</p>
            </div>

            <div className="flex h-full flex-col justify-center gap-y-4">
              <div className="text-center">
                <h3 className="text-theme-primary">73%</h3>
                <p className="text-theme-secondary">120 of 164 rooms occupied</p>
              </div>
              <div className="space-y-2">
                <div className="text-theme-secondary flex justify-between">
                  <span>Occupied</span>
                  <span>120 rooms</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              <div className="border-theme-secondary-300 grid grid-cols-2 gap-4 border-t pt-4">
                <div className="text-center">
                  <h3 className="text-theme-success">29</h3>
                  <p className="text-theme-secondary text-body-3 font-semibold">Available</p>
                </div>
                <div className="text-center">
                  <h3 className="text-theme-warning">15</h3>
                  <p className="text-theme-secondary text-body-3 font-semibold">Maintenance</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OverviewTab
