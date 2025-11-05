import { Plus } from 'lucide-react'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Card } from '@/components/common'
import { useRentoraApiApartmentServiceList, useRentoraApiCreateApartmentService } from '@/hooks'
import type { ApartmentMainServiceSchema, ICreateApartmentServiceRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

import ApartmentMainService from './ApartmentMainService'
import ApartmentMainServiceExecuteModal from './ApartmentMainServiceExecuteModal'

const ApartmentMainServiceSetting = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: apartmentServiceList, isLoading: isLoadingApartmentServiceList } = useRentoraApiApartmentServiceList({
    apartmentId: apartmentId!,
  })

  const { mutateAsync: createApartmentService, isPending: isCreatingApartmentService } =
    useRentoraApiCreateApartmentService(apartmentId!)
  const handleCreateApartmentService = useCallback(
    async (data: ApartmentMainServiceSchema) => {
      const payload: ICreateApartmentServiceRequestPayload = {
        serviceName: data.serviceName,
        price: Number(data.price),
        category: data.category,
        isActive: data.isActive,
      }
      try {
        await createApartmentService(payload)
        toast.success('Service created successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [createApartmentService],
  )

  return (
    <Card className="justify-start rounded-xl shadow">
      <div className="flex items-center justify-between">
        <div>
          <h4>Main Service</h4>
          <p className="text-body-2 text-theme-secondary">Manage main service in your complex</p>
        </div>
        <div>
          <ApartmentMainServiceExecuteModal
            onSubmit={handleCreateApartmentService}
            isPending={isCreatingApartmentService}
          >
            <Button className="flex items-center gap-2" size="icon" variant="outline">
              <Plus className="size-4" />
            </Button>
          </ApartmentMainServiceExecuteModal>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <ApartmentMainService
            isLoading={isLoadingApartmentServiceList}
            apartmentServiceList={apartmentServiceList ?? []}
          />
        </div>
      </div>
    </Card>
  )
}

export default ApartmentMainServiceSetting
