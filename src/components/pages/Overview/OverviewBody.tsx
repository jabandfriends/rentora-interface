import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { type ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig
const OverviewBody = () => {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="monthly">
        <div className="flex items-center justify-center gap-x-12">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Rent</TabsTrigger>
            <TabsTrigger value="water">Water Bill</TabsTrigger>
            <TabsTrigger value="electricity">Electricity Bill</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="monthly">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-1/2">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <ChartTooltip />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </TabsContent>
        <TabsContent value="water">Water Bill</TabsContent>
        <TabsContent value="electricity">Electricity Bill</TabsContent>
      </Tabs>
    </div>
  )
}

export default OverviewBody
