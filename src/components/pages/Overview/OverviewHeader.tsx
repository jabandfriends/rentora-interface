import { Bell } from 'lucide-react'

import { Button } from '@/components/common'

const OverviewHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3>Apartment Management Dashboard</h3>
        <p className="text-theme-secondary mt-1">Overview of your property portfolio</p>
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Bell size={16} />
        Notifications
      </Button>
    </div>
  )
}

export default OverviewHeader
