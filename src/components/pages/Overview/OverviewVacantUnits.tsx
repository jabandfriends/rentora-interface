import { Users } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge, PageTableEmpty } from '@/components/ui'
import type { IUnit } from '@/types'

const OverviewVacantUnits = ({ totalUnits, allRooms }: { totalUnits: number; allRooms: Array<IUnit> }) => {
  if (!allRooms || allRooms.length === 0) {
    return (
      <Card className="justify-start rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Vacant Units ({totalUnits})
          </CardTitle>
          <CardDescription>Available units ready for new tenants</CardDescription>
        </CardHeader>
        <PageTableEmpty
          message="No available units found"
          description="Your apartment is fully occupied or not have a room yet."
        />
      </Card>
    )
  }
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Vacant Units ({totalUnits})
        </CardTitle>
        <CardDescription>Available units ready for new tenants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="desktop:grid-cols-6 grid grid-cols-2 gap-4">
          {allRooms.map((unit: IUnit) => (
            <div
              key={unit.unitName}
              className="hover:bg-theme-secondary-100 border-theme-secondary-300 cursor-pointer rounded-lg border p-4 text-center duration-200"
            >
              <div className="text-lg font-bold text-gray-900">Unit {unit.unitName}</div>
              <Badge variant="secondary" className="mt-2 capitalize">
                {unit.unitStatus}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OverviewVacantUnits
