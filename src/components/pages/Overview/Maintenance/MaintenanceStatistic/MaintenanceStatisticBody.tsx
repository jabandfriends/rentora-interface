import { Wrench } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'

import MaintenanceStatistic from './MaintenanceStatistic'

const MaintenanceStatisticBody = () => {
  return (
    <Card className="justify-start space-y-2 rounded-2xl">
      <CardHeader className="flex items-center gap-2">
        <Wrench className="bg-theme-primary text-theme-white size-8 rounded-lg p-1" />
        <div>
          <CardTitle>Maintenance Analytics</CardTitle>
          <CardDescription>View the maintenance analytics for your apartment.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <MaintenanceStatistic />
      </CardContent>
    </Card>
  )
}

export default MaintenanceStatisticBody
