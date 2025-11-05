import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { TAB_APARTMNET_SETTING_LIST } from '@/constants'
import type { TTabApartmentSetting } from '@/types'

import ApartmentBuildingSetting from './ApartmentBuildingSetting'
import ApartmentFinancialSetting from './ApartmentFinancialSetting'
import ApartmentInformationSetting from './ApartmentInformationSetting'
import { ApartmentMainServiceSetting } from './ApartmentServiceSetting'
// import ApartmentPaymentSetting from './ApartmentPaymentSetting'
import ApartmentUtilitySetting from './ApartmentUtilitySetting'

const ApartmentSettingBody = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="information" className="w-full">
        <TabsList className="border-theme-secondary-300 bg-theme-light desktop:grid-cols-5 grid h-auto w-full grid-cols-2 gap-1 border p-2 shadow-sm">
          {TAB_APARTMNET_SETTING_LIST.map((tab: TTabApartmentSetting) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-theme-primary hover:bg-theme-secondary-200/50 hover:text-theme-primary data-[state=active]:text-theme-white flex items-center gap-2 p-2 duration-100"
            >
              {tab.icon}
              <span className="hidden">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="information" className="mt-6">
          <ApartmentInformationSetting />
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <ApartmentFinancialSetting />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <ApartmentMainServiceSetting />
        </TabsContent>

        <TabsContent value="utilities" className="mt-6">
          <ApartmentUtilitySetting />
        </TabsContent>

        <TabsContent value="building" className="mt-6">
          <ApartmentBuildingSetting />
        </TabsContent>

        {/* <TabsContent value="payment" className="mt-6">
          <ApartmentPaymentSetting />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

export default ApartmentSettingBody
