import { AlertTriangle, DollarSign, Home, Wrench } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common'
import { Progress } from '@/components/feature'
import { formatCurrency, formatNumber } from '@/utilities'

type IDashboardStats = {
  occupiedUnits: number
  totalUnits: number
  occupancyRate: number
  monthlyRevenue: number
  maintenanceRequests: number
  pendingPayments: number
}

const OverviewStats = ({
  occupiedUnits,
  totalUnits,
  occupancyRate,
  monthlyRevenue,
  maintenanceRequests,
  pendingPayments,
}: IDashboardStats) => {
  return (
    <div className="desktop:grid-cols-4 grid gap-4">
      <Card className="justify-start rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-body-2">Total Units</CardTitle>
          <Home className="text-theme-secondary size-4" />
        </CardHeader>
        <CardContent>
          <h4 className="font-bold">
            {occupiedUnits ? formatNumber(occupiedUnits) : '0'}/{totalUnits ? formatNumber(totalUnits) : '0'}
          </h4>
          <p className="text-theme-secondary text-body-2 mt-1">{occupancyRate}% occupancy rate</p>
          <Progress value={occupancyRate} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="justify-start rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-body-2">Monthly Revenue</CardTitle>
          <DollarSign className="text-theme-secondary size-4" />
        </CardHeader>
        <CardContent>
          <h4 className="font-bold">{monthlyRevenue ? formatCurrency(monthlyRevenue) : '฿0'}</h4>
          {/* <p className="text-body-2 mt-1 flex items-center gap-1 text-theme-success-600">
            <TrendingUp size={12} /> +12% from last month
          </p> */}
        </CardContent>
      </Card>

      <Card className="justify-start rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-body-2">Maintenance Requests</CardTitle>
          <Wrench className="text-theme-secondary size-4" />
        </CardHeader>
        <CardContent>
          <h4 className="font-bold">{maintenanceRequests ? formatNumber(maintenanceRequests) : '0'}</h4>
          <p className="text-body-2 text-theme-warning-600/60 mt-1 font-medium">4 require immediate attention</p>
        </CardContent>
      </Card>

      <Card className="justify-start rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-body-2">Pending Payments</CardTitle>
          <AlertTriangle className="text-theme-secondary size-4" />
        </CardHeader>
        <CardContent>
          <h4 className="font-bold">{pendingPayments ? formatCurrency(pendingPayments) : '฿0'}</h4>
          <p className="text-theme-secondary text-body-2 mt-1">From 3 tenants</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default OverviewStats
