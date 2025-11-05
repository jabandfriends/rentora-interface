import { Skeleton, Spinner } from '@/components/common'
import { Badge, EmptyPage, PageTableEmpty } from '@/components/ui'
import type { IApartmentService } from '@/types'

import ApartmentMainServiceCard from './ApartmentMainServiceCard'

type IApartmentMainService = {
  isLoading: boolean
  apartmentServiceList: Array<IApartmentService>
}

const ApartmentMainService = ({ isLoading, apartmentServiceList }: IApartmentMainService) => {
  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-between">
          <p className="text-body-2">Current Service</p>
          <Badge variant="secondary">
            <Skeleton className="h-4 w-4" /> services
          </Badge>
        </div>
        <PageTableEmpty
          icon={<Spinner />}
          message="Loading your apartment service list"
          description="Please wait while we load your apartment service list"
        />
      </>
    )
  }
  if (!apartmentServiceList || apartmentServiceList.length === 0) {
    return (
      <>
        <div className="flex items-center justify-between">
          <p className="text-body-2">Current Service</p>
          <Badge variant="secondary">0 services</Badge>
        </div>
        <EmptyPage title="No service found" description="Please add a service to this apartment" />
      </>
    )
  }
  return (
    <>
      {/* current service */}
      <div className="flex items-center justify-between">
        <p className="text-body-2">Current Service</p>
        <Badge variant="secondary">{apartmentServiceList.length} services</Badge>
      </div>
      <div className="desktop:grid-cols-4 grid gap-2">
        {apartmentServiceList.map((service: IApartmentService, index) => (
          <ApartmentMainServiceCard key={`apartment-main-service-${index}-${service.id}`} service={service} />
        ))}
      </div>
    </>
  )
}

export default ApartmentMainService
