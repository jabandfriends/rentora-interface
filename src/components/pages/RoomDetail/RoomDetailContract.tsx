import { Calendar, CalendarRange } from 'lucide-react'
import { type ReactNode, useCallback, useState } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Label } from '@/components/common'
import { Tabs, TabsList, TabsTrigger } from '@/components/feature'
import { ContractType, ROUTES } from '@/constants'

const RoomDetailContract = () => {
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()
  const [billingType, setBillingType] = useState<ContractType>(ContractType.MONTHLY)

  const handleNavigateCreateContract = useCallback(() => {
    navigate(ROUTES.contractCreate.getPath(apartmentId, id))
  }, [navigate, apartmentId, id])
  return (
    <Card className="border-border justify-start rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 border-b pb-4">
        <h3>Contract Details</h3>
        <p className="text-body-2 text-theme-secondary-600">Select the billing cycle for this room</p>
      </div>

      <div>
        <div className="space-y-4">
          <Label className="font-semibold">Contract Type</Label>
          <Tabs value={billingType} onValueChange={(val) => setBillingType(val as ContractType)} className="w-full">
            <TabsList className="bg-theme-secondary-100/80 grid h-auto w-full grid-cols-2 p-1">
              <TabsTrigger
                value={ContractType.MONTHLY}
                className="text-theme-secondary-500 data-[state=active]:text-theme-white data-[state=active]:bg-theme-primary flex flex-col items-center gap-2 py-4 data-[state=active]:shadow-md"
              >
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Monthly</span>
                <span className="text-body-2 opacity-90">Standard billing</span>
              </TabsTrigger>

              <TabsTrigger
                value={ContractType.YEARLY}
                className="text-theme-secondary-500 data-[state=active]:text-theme-white data-[state=active]:bg-theme-primary flex flex-col items-center gap-2 py-4 data-[state=active]:shadow-md"
              >
                <CalendarRange className="h-5 w-5" />
                <span className="font-semibold">Yearly</span>
                <span className="text-body-2 opacity-90">Long-term</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Contract Type Info */}
          <div className="bg-theme-secondary-200/30 border-theme-secondary-400/60 rounded-lg border p-4">
            {billingType === ContractType.MONTHLY && (
              <ContractDescription
                icon={<Calendar className="h-5 w-5" />}
                title="Monthly Contract"
                description="Standard monthly billing cycle. Services are charged at the beginning of each month."
              />
            )}

            {billingType === ContractType.YEARLY && (
              <ContractDescription
                icon={<CalendarRange className="h-5 w-5" />}
                title="Yearly Contract"
                description="Long-term annual agreement with discounted rates. Billed once per year."
              />
            )}
          </div>

          <div className="flex items-center justify-end">
            <Button onClick={handleNavigateCreateContract}>Create {billingType} contract</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

type IContractDescription = {
  icon: ReactNode
  title: string
  description: string
}
const ContractDescription = ({ icon, title, description }: IContractDescription) => {
  return (
    <div className="space-y-2">
      <div className="text-theme-primary flex items-center gap-2 font-semibold">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-body-2 text-theme-secondary-600">{description}</p>
    </div>
  )
}

export default RoomDetailContract
