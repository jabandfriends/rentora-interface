import { useParams } from 'react-router-dom'

import { PageSection } from '@/components/layout'
import { TenantRoomBody } from '@/components/pages/TenantProfile/TenantRoom'
import { useRentoraApiTenantCurrentContract } from '@/hooks'

const TenantRoom = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: currentContract, isLoading: isLoadingCurrentContract } = useRentoraApiTenantCurrentContract({
    apartmentId: apartmentId!,
  })
  return (
    <PageSection>
      <TenantRoomBody currentContract={currentContract} isLoadingCurrentContract={isLoadingCurrentContract} />
    </PageSection>
  )
}

export default TenantRoom
