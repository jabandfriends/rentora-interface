import { TrendingUp } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import type { IPaymentMonthlySummary, IPaymentYearlySummary, Maybe } from '@/types'

import { TransactionVolumeChart, TransactionVolumeChartYearly } from './Charts'

type ITransactionVolumeSectionProps = {
  year: number
  handleYearChange: (value: string) => void
  availableYears: Maybe<Array<number>>
  monthlyPaymentAnalytics: Maybe<Array<IPaymentMonthlySummary>>
  yearlyPaymentAnalytics: Maybe<Array<IPaymentYearlySummary>>
  isLoadingMonthlyPaymentAnalytics: boolean
  isLoadingYearlyPaymentAnalytics: boolean
}
const TransactionVolumeSection = ({
  year,
  handleYearChange,
  availableYears,
  monthlyPaymentAnalytics,
  yearlyPaymentAnalytics,
  isLoadingMonthlyPaymentAnalytics,
  isLoadingYearlyPaymentAnalytics,
}: ITransactionVolumeSectionProps) => {
  return (
    <Card className="justify-start space-y-4 rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="bg-theme-primary text-theme-white size-8 rounded-md p-1" />
          <div>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Total transaction volume by year</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <div className="flex items-center justify-between gap-2">
            <TabsList className="border-theme-secondary-300 border">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <Select value={year.toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="border-none shadow-none">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears?.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="monthly">
            <TransactionVolumeChart data={monthlyPaymentAnalytics} isLoading={isLoadingMonthlyPaymentAnalytics} />
          </TabsContent>
          <TabsContent value="yearly">
            <TransactionVolumeChartYearly data={yearlyPaymentAnalytics} isLoading={isLoadingYearlyPaymentAnalytics} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default TransactionVolumeSection
