import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card } from '@/components/common'
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

const RentChart = () => {
  return (
    <Card className="flex-2 desktop:px-12 flex flex-col gap-y-8 rounded-xl py-10">
      <div>
        <h3>Rent Report</h3>
        <p className="text-theme-secondary">Monthly rent report</p>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[300px] rounded-2xl">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis dataKey="desktop" />
          <ChartTooltip />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}

export default RentChart
