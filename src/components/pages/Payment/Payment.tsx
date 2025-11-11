import { useDebounce } from '@uidotdev/usehooks'
import { AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { PageTableBody, PageTableHeader } from '@/components/ui'
import { DEFAULT_PAYMENT_LIST_DATA } from '@/constants'
import { PaymentStatus, VerifiedStatus } from '@/enum/payment'
import { useRentoraApiPaymentList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

import PaymentSearch from './PaymentSearch'
import PaymentTable from './PaymentTable'

const Payment = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_PAYMENT_LIST_DATA.page,
  )

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      status: '' as PaymentStatus,
      verifiedStatus: '',
      genMonth: '',
      buildingName: '',
    },
  })

  const [search, status, verifiedStatus, genMonth, buildingName]: [string, PaymentStatus, string, string, string] =
    watch(['search', 'status', 'verifiedStatus', 'genMonth', 'buildingName'])

  // debounce
  const debouncedSearch = useDebounce(search ? search : undefined, 150)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedVerified = useDebounce(verifiedStatus ? verifiedStatus : undefined, 300)
  const debouncedGenMonth = useDebounce(genMonth ? genMonth : undefined, 300)
  const debouncedBuildingName = useDebounce(buildingName ? buildingName : undefined, 300)
  // DATA
  const {
    data: paymentList,
    pagination: { totalPages, totalElements },
    metadata: { totalPayments, totalPaymentsComplete, totalPaymentsPending, totalPaymentsFailed },
    isLoading,
  } = useRentoraApiPaymentList({
    apartmentId: apartmentId!,
    params: {
      page: currentPage,
      size: DEFAULT_PAYMENT_LIST_DATA.size,
      search: debouncedSearch,
      genMonth: debouncedGenMonth,
      status: debouncedStatus,
      buildingName: debouncedBuildingName,
    },
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_PAYMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleStatusChange = useCallback(
    (value: PaymentStatus) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_PAYMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleVerifiedChange = useCallback(
    (value: VerifiedStatus) => {
      setValue('verifiedStatus', value)
      setCurrentPage(DEFAULT_PAYMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const handleGenMonthChange = useCallback(
    (value: string) => {
      setValue('genMonth', value)
      setCurrentPage(DEFAULT_PAYMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleBuildingNameChange = useCallback(
    (value: string) => {
      setValue('buildingName', value)
      setCurrentPage(DEFAULT_PAYMENT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const isSearched: boolean = useMemo(
    () => !!debouncedSearch || !!debouncedStatus || !!debouncedVerified,
    [debouncedSearch, debouncedStatus, debouncedVerified],
  )

  const PAYMENT_STATS: Array<IStatsCardProps> = useMemo(
    () => [
      {
        title: 'Total Payments',
        count: totalPayments,
        type: 'primary',
        icon: <DollarSign size={20} />,
      },
      {
        title: 'Completed',
        count: totalPaymentsComplete,
        type: 'success',
        icon: <CheckCircle size={20} />,
      },
      {
        title: 'Pending',
        count: totalPaymentsPending,
        type: 'warning',
        icon: <Clock size={20} />,
      },
      {
        title: 'Failed',
        count: totalPaymentsFailed,
        type: 'error',
        icon: <AlertTriangle size={20} />,
      },
    ],
    [totalPayments, totalPaymentsComplete, totalPaymentsPending, totalPaymentsFailed],
  )

  return (
    <>
      <PageTableBody className="space-y-8">
        <PageTableHeader
          title="Payment Analytics"
          description="View statistics and filter through all payment records"
          stats={PAYMENT_STATS}
          isLoading={isLoading}
        />
        <PaymentSearch
          onSearchChange={handleSearchChange}
          onPaymentStatusChange={handleStatusChange}
          onVerifiedStatusChange={handleVerifiedChange}
          onGenMonthChange={handleGenMonthChange}
          onBuildingNameChange={handleBuildingNameChange}
        />
        <PaymentTable
          isGenMonthSelected={debouncedGenMonth}
          data={paymentList}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          isSearched={isSearched}
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
        />
      </PageTableBody>
    </>
  )
}

export default Payment
