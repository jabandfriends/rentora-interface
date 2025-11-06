import { Card } from '@/components/common'

import ApartmentPaymentSettingList from './ApartmentPaymentSettingList'

const ApartmentPaymentSetting = () => {
  return (
    <Card className="justify-start rounded-xl shadow">
      <div>
        <h4>Payment Methods</h4>
        <p className="text-body-2 text-theme-secondary">Manage bank accounts for rent payments</p>
      </div>

      {/* List of Current Payments */}
      <ApartmentPaymentSettingList />
    </Card>
  )
}

export default ApartmentPaymentSetting
