import { Users } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'

const OverviewVacantUnits = ({ vacantUnits }: { vacantUnits: number }) => {
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Vacant Units ({vacantUnits})
        </CardTitle>
        <CardDescription>Available units ready for new tenants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="desktop:grid-cols-6 grid grid-cols-2 gap-4">
          {['107', '214', '309', '415', '502', '603'].map((unit) => (
            <div
              key={unit}
              className="hover:bg-theme-secondary-100 border-theme-secondary-300 cursor-pointer rounded-lg border p-4 text-center duration-200"
            >
              <div className="text-lg font-bold text-gray-900">Unit {unit}</div>
              <Badge variant="secondary" className="mt-2">
                Available
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OverviewVacantUnits
