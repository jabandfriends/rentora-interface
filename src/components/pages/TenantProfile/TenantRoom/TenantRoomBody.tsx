import { EmptyPage, LoadingPage } from '@/components/ui'
import type { ITenantCurrentContract, Maybe } from '@/types'

import { TenantLatestUtilityUsage } from './TenantLatestUtilityUsage'
import TenantRoomCurrentContract from './TenantRoomCurrentContract'
import { TenantRoomServices } from './TenantRoomService'

type ITenantRoomBodyProps = {
  currentContract: Maybe<ITenantCurrentContract>
  isLoadingCurrentContract: boolean
}
const TenantRoomBody = ({ currentContract, isLoadingCurrentContract }: ITenantRoomBodyProps) => {
  if (isLoadingCurrentContract) {
    return <LoadingPage />
  }
  if (!currentContract) {
    return (
      <EmptyPage title="No current contract found" description="No current contract found. Please try again later." />
    )
  }
  return (
    <div className="space-y-4">
      <TenantRoomCurrentContract currentContract={currentContract} />
      <div className="desktop:grid-cols-2 grid gap-4">
        <TenantRoomServices services={currentContract.roomServices} />
        <TenantLatestUtilityUsage utilityUsages={currentContract.utilityUsage} />
      </div>
    </div>
  )
}

export default TenantRoomBody
