import { TenantLatestUtilityUsage } from './TenantLatestUtilityUsage'
import TenantRoomCurrentContract from './TenantRoomCurrentContract'
import { TenantRoomServices } from './TenantRoomService'

const TenantRoomBody = () => {
  return (
    <div className="space-y-4">
      <TenantRoomCurrentContract />
      <div className="desktop:grid-cols-2 grid gap-4">
        <TenantRoomServices />
        <TenantLatestUtilityUsage />
      </div>
    </div>
  )
}

export default TenantRoomBody
