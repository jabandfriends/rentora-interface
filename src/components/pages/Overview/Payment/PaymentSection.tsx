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

import { MonthlyPaymentSummaryChart, PaymentDistribution, YearlyPaymentSummaryChart } from './Charts'

type IPaymentSectionProps = {
  year: number
  handleYearChange: (value: string) => void
  availableYears: Maybe<Array<number>>
  yearlyPaymentAnalytics: Maybe<Array<IPaymentYearlySummary>>
  monthlyPaymentAnalytics: Maybe<Array<IPaymentMonthlySummary>>
  isLoadingYearlyPaymentAnalytics: boolean
  isLoadingMonthlyPaymentAnalytics: boolean
}
const PaymentSection = ({
  year,
  handleYearChange,
  availableYears,
  yearlyPaymentAnalytics,
  monthlyPaymentAnalytics,
  isLoadingYearlyPaymentAnalytics,
  isLoadingMonthlyPaymentAnalytics,
}: IPaymentSectionProps) => {
  return (
    <div className="desktop:flex-row flex flex-col gap-4">
      <Card className="flex-2 space-y-4 rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="bg-theme-primary text-theme-white size-8 rounded-md p-1" />
            <div>
              <CardTitle>Total Payment Amount</CardTitle>
              <CardDescription>Total payment amount by year</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" className="space-y-2">
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

            <TabsContent value="yearly">
              <YearlyPaymentSummaryChart data={yearlyPaymentAnalytics} isLoading={isLoadingYearlyPaymentAnalytics} />
            </TabsContent>
            <TabsContent value="monthly">
              <MonthlyPaymentSummaryChart
                data={monthlyPaymentAnalytics}
                isDataLoading={isLoadingMonthlyPaymentAnalytics}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className="flex-1 justify-start space-y-4 rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="bg-theme-primary text-theme-white size-8 rounded-md p-1" />
            <div>
              <CardTitle>Payment Status Breakdown</CardTitle>
              <CardDescription>Overview of payments by status for this apartment</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PaymentDistribution />
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentSection
