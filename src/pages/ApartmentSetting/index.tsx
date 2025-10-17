import { PageHeader, PageSection } from '@/components/layout'
import { ApartmentSettingBody } from '@/components/pages/ApartmentSetting'

const ApartmentSetting = () => {
  return (
    <PageSection>
      <PageHeader title="Apartment Settings" description="Configure your apartment complex details and preferences" />
      <ApartmentSettingBody />
    </PageSection>
  )
}

export default ApartmentSetting
