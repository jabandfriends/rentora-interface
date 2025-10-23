import { AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react'
import { useMemo, useState } from 'react'

import { PageTableHeader } from '@/components/ui'
import type { IStatsCardProps } from '@/types'

import PaymentSearch from './PaymentSearch'
import PaymentTable from './PaymentTable'

const Payment = () => {
  //const [currentPage, setCurrentPage] = useState(DEFAULT_UNIT_LIST_DATA.page)
  //const [search, setSearch] = useState('')
  //const [status, setStatus] = useState('')
  //const [verifiedStatus, setVerifiedStatus] = useState('')

  // metadata
  const [metadata] = useState({
    totalPayments: 25,
    totalCompleted: 12,
    totalPending: 8,
    totalFailed: 3,
    totalVerified: 20,
  })

  // debounce
  // const debouncedSearch = useDebounce(search ? search : undefined, 500)
  // const debouncedStatus = useDebounce(status ? status : undefined, 300)
  // const debouncedVerified = useDebounce(verifiedStatus ? verifiedStatus : undefined, 300)

  // MOCK DATA
  const [data] = useState<Array<any>>([])
  const [totalPages] = useState(0)
  const [totalElements] = useState(0)
  const [isLoading] = useState(false)

  //   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearch(e.target.value)
  //     setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
  //   }, [])

  //   const handleStatusChange = useCallback((value: string) => {
  //     setStatus(value)
  //     setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
  //   }, [])

  //   const handleVerifiedChange = useCallback((value: string) => {
  //     setVerifiedStatus(value)
  //     setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
  //   }, [])

  //   const handlePageChange = useCallback((page: number) => {
  //     if (page < 1) return
  //     setCurrentPage(page)
  //   }, [])

  // Mock stats
  const PAYMENT_STATS: Array<IStatsCardProps> = useMemo(
    () => [
      {
        title: 'Total Payments',
        count: metadata.totalPayments,
        type: 'primary',
        icon: <DollarSign size={20} />,
      },
      {
        title: 'Completed',
        count: metadata.totalCompleted,
        type: 'success',
        icon: <CheckCircle size={20} />,
      },
      {
        title: 'Pending',
        count: metadata.totalPending,
        type: 'warning',
        icon: <Clock size={20} />,
      },
      {
        title: 'Failed',
        count: metadata.totalFailed,
        type: 'error',
        icon: <AlertTriangle size={20} />,
      },
    ],
    [metadata],
  )

  return (
    <>
      <PageTableHeader
        title="Payment"
        description="Manage and view all payments"
        stats={PAYMENT_STATS}
        isLoading={isLoading}
      />
      <PaymentSearch />
      <PaymentTable data={data} isLoading={isLoading} totalPages={totalPages} totalElements={totalElements} />
    </>
  )
}

export default Payment
