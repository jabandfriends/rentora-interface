import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import { EmptyPage, LoadingPage } from '@/components/ui'
import { useRentoraApiGetApartmentPayment } from '@/hooks'

import ApartmentPaymentCard from './ApartmentPaymentCard'
import ApartmentPaymentQrModal from './ApartmentPaymentQrModal'
import ApartmentPaymentUploadQRModal from './ApartmentPaymentUploadQRModal'

const ApartmentPaymentSettingList = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [isUploadQRCodeModalOpen, setIsUploadQRCodeModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)

  const [isQRCodeModalOpen, setIsQRCodeModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const { data: apartmentPayment, isLoading: isApartmentPaymentLoading } = useRentoraApiGetApartmentPayment({
    apartmentId: apartmentId!,
  })

  //open upload qr code modal
  const handleOpenUploadQRCodeModal = useCallback(() => {
    setIsUploadQRCodeModalOpen(true)
  }, [])

  const handleOpenQRCodeModal = useCallback(() => {
    setIsQRCodeModalOpen(true)
  }, [])
  if (isApartmentPaymentLoading) return <LoadingPage />
  if (!apartmentPayment) return <EmptyPage title="No payment methods found" description="Please add a payment method" />

  return (
    <div className="flex flex-col gap-2">
      <ApartmentPaymentUploadQRModal
        isOpen={isUploadQRCodeModalOpen}
        onOpenChange={setIsUploadQRCodeModalOpen}
        apartmentPayment={apartmentPayment}
      />
      <ApartmentPaymentQrModal
        isOpen={isQRCodeModalOpen}
        onOpenChange={setIsQRCodeModalOpen}
        qrCode={apartmentPayment.promptpayURL}
      />
      <ApartmentPaymentCard
        payment={apartmentPayment}
        onOpenUploadQRCodeModal={handleOpenUploadQRCodeModal}
        onOpenQRCodeModal={handleOpenQRCodeModal}
      />
    </div>
  )
}

export default ApartmentPaymentSettingList
