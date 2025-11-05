import { useParams } from 'react-router-dom'

import { EmptyPage, LoadingPage } from '@/components/ui'
import { useRentoraApiGetApartmentPayment } from '@/hooks'

import ApartmentPaymentCard from './ApartmentPaymentCard'

const ApartmentPaymentSettingList = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: apartmentPayment, isLoading: isApartmentPaymentLoading } = useRentoraApiGetApartmentPayment({
    apartmentId: apartmentId!,
  })

  if (isApartmentPaymentLoading) return <LoadingPage />
  if (!apartmentPayment) return <EmptyPage title="No payment methods found" description="Please add a payment method" />

  return (
    <div className="flex flex-col gap-2">
      <ApartmentPaymentCard payment={apartmentPayment} />
    </div>
  )
}

export default ApartmentPaymentSettingList
