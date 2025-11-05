import { Pencil, X } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import type { VariantProps } from 'tailwind-variants'

import { Button } from '@/components/common'
import { Badge } from '@/components/ui'
import { useRentoraApiUpdateApartmentService } from '@/hooks'
import type { ApartmentMainServiceSchema, IApartmentService, IUpdateApartmentServiceRequestPayload } from '@/types'
import { formatCurrency, getErrorMessage } from '@/utilities'

import ApartmentMainServiceExecuteModal from './ApartmentMainServiceExecuteModal'

type IApartmentMainService = {
  service: IApartmentService
}
const ApartmentMainServiceCard = ({ service }: IApartmentMainService) => {
  const { mutateAsync: updateApartmentService, isPending: isUpdatingApartmentService } =
    useRentoraApiUpdateApartmentService()

  const handleUpdateApartmentService = useCallback(
    async (data: ApartmentMainServiceSchema) => {
      const payload: IUpdateApartmentServiceRequestPayload = {
        serviceName: data.serviceName,
        price: Number(data.price),
        category: data.category,
        isActive: data.isActive,
        apartmentServiceId: service.id,
      }
      try {
        await updateApartmentService(payload)
        toast.success('Service updated successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateApartmentService, service],
  )

  const isActiveBadgeVariant: VariantProps<typeof Badge>['variant'] = useMemo(() => {
    if (service.isActive) {
      return 'success'
    }
    return 'error'
  }, [service.isActive])

  return (
    <div className="border-theme-secondary-300 hover:border-theme-primary-300 hover:bg-theme-primary-100 group flex items-center justify-between gap-1 rounded-xl border px-4 py-4 duration-200">
      <div>
        <div className="desktop:flex-row flex flex-col items-start gap-2">
          <h4>{service.serviceName}</h4>
          <div className="space-x-2">
            <Badge className="capitalize">{service.category}</Badge>
            <Badge variant={isActiveBadgeVariant} className="capitalize">
              {service.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <p className="text-body-2 text-theme-secondary">{formatCurrency(service.price)}</p>
      </div>
      <div className="desktop:opacity-0 flex items-center gap-2 duration-200 group-hover:opacity-100">
        <ApartmentMainServiceExecuteModal
          onSubmit={handleUpdateApartmentService}
          isPending={isUpdatingApartmentService}
          apartmentService={service}
        >
          <Button
            className="hover:bg-theme-primary/20 hover:text-theme-primary flex items-center"
            variant="ghost"
            size="icon"
          >
            <Pencil className="size-4" />
          </Button>
        </ApartmentMainServiceExecuteModal>

        <Button
          className="hover:bg-theme-error/20 hover:text-theme-error flex items-center"
          variant="ghost"
          size="icon"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default ApartmentMainServiceCard
