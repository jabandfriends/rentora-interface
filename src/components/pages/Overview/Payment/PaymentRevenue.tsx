import { useDebounce } from '@uidotdev/usehooks'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
  useRentoraApiGetPaymentAnalyticAvailableYears,
  useRentoraApiMonthlyPaymentAnalytic,
  useRentoraApiYearlyPaymentAnalytics,
} from '@/hooks'

import PaymentSection from './PaymentSection'
import PaymentStats from './PaymentStats'
import TransactionVolumeSection from './TransactionVolumeSection'

const PaymentRevenue = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { watch, setValue } = useForm({
    defaultValues: {
      year: new Date().getFullYear(),
    },
  })
  const [year]: [number] = watch(['year'])
  const debouncedYear = useDebounce(year ? year : new Date().getFullYear(), 500)

  const { data: availableYears } = useRentoraApiGetPaymentAnalyticAvailableYears({
    apartmentId,
  })

  const { data: monthlyPaymentAnalytics, isLoading: isLoadingMonthlyPaymentAnalytics } =
    useRentoraApiMonthlyPaymentAnalytic({
      apartmentId,
      params: { year: debouncedYear },
    })

  const { data: yearlyPaymentAnalytics, isLoading: isLoadingYearlyPaymentAnalytics } =
    useRentoraApiYearlyPaymentAnalytics({
      apartmentId,
    })

  //handle
  const handleYearChange = useCallback(
    (value: string) => {
      setValue('year', parseInt(value))
    },
    [setValue],
  )

  return (
    <div className="space-y-4">
      <PaymentStats />
      <PaymentSection
        year={year}
        handleYearChange={handleYearChange}
        availableYears={availableYears}
        yearlyPaymentAnalytics={yearlyPaymentAnalytics}
        monthlyPaymentAnalytics={monthlyPaymentAnalytics}
        isLoadingYearlyPaymentAnalytics={isLoadingYearlyPaymentAnalytics}
        isLoadingMonthlyPaymentAnalytics={isLoadingMonthlyPaymentAnalytics}
      />
      {/* Transaction Volume */}
      <TransactionVolumeSection
        year={year}
        handleYearChange={handleYearChange}
        availableYears={availableYears}
        monthlyPaymentAnalytics={monthlyPaymentAnalytics}
        yearlyPaymentAnalytics={yearlyPaymentAnalytics}
        isLoadingMonthlyPaymentAnalytics={isLoadingMonthlyPaymentAnalytics}
        isLoadingYearlyPaymentAnalytics={isLoadingYearlyPaymentAnalytics}
      />
    </div>
  )
}

export default PaymentRevenue
