import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import OverviewTab from '@/components/pages/Overview/OverviewTab'

const OverviewBody = () => {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="monthly" className="flex flex-col gap-y-8">
        <div className="flex items-center justify-center gap-x-12">
          <TabsList className="desktop:w-2/6 h-16 rounded-2xl">
            <TabsTrigger value="monthly">Monthly Rent</TabsTrigger>
            <TabsTrigger value="water">Water Bill</TabsTrigger>
            <TabsTrigger value="electricity">Electricity Bill</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="monthly">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="water">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="electricity">
          <OverviewTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OverviewBody
