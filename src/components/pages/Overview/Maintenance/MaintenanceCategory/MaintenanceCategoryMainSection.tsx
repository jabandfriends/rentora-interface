import { PieChart } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { cn } from '@/utilities'

import MaintenanceCategorySummaryChart from './MaintenanceCategorySummaryChart'

type IMaintenanceCategoryMainSectionProps = {
  className?: string
}
const MaintenanceCategoryMainSection = ({ className }: IMaintenanceCategoryMainSectionProps) => {
  return (
    <Card className={cn('justify-start space-y-2 rounded-2xl', className)}>
      <CardHeader className="flex items-center gap-2">
        <PieChart className="bg-theme-primary text-theme-white size-8 rounded-lg p-1" />
        <div>
          <CardTitle>Maintenance Category Summary</CardTitle>
          <CardDescription>View the maintenance category summary for your apartment.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <MaintenanceCategorySummaryChart />
      </CardContent>
    </Card>
  )
}
export default MaintenanceCategoryMainSection
