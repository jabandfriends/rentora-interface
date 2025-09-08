import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card } from '@/components/common'
import { type ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui'

const chartData = [
  { month: 'May', total: 209 },
  { month: 'June', total: 214 },
  { month: 'July', total: 186 },
  { month: 'August', total: 305 },
  { month: 'September', total: 237 },
  { month: 'October', total: 73 },
  { month: 'November', total: 209 },
  { month: 'December', total: 214 },
]

const chartConfig = {
  total: {
    label: 'total',
    color: '#2563eb',
  },
} satisfies ChartConfig

const RentChart = () => {
  return (
    <Card className="flex-2 desktop:px-12 flex flex-col gap-y-8 rounded-xl py-10">
      <div>
        <h3>Rent Report</h3>
        <p className="text-theme-secondary">Monthly rent report</p>
      </div>
      <ChartContainer config={chartConfig} className="min-h-44 rounded-2xl">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis dataKey="total" />
          <ChartTooltip />
          <Bar dataKey="total" fill="var(--color-total)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}

export default RentChart
