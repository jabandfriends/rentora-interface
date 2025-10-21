import { Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import {
  Button,
  Card,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/components/common'
import { PageTableEmpty, Table, TableHead, TableHeader, TableRow } from '@/components/ui'
import { useRentoraApiApartmentServiceList, useRentoraApiCreateApartmentService } from '@/hooks'
import { useRentoraApiUnitServiceList } from '@/hooks/api/queries/useRentoraApiUnitServiceList'
import type { IApartmentService } from '@/types'
import { getErrorMessage } from '@/utilities'

import RoomDetailServiceTableBody from './RoomDetailServiceTableBody'

const RoomDetailServices = () => {
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()
  const [selectedServiceId, setSelectedServiceId]: [string, Dispatch<SetStateAction<string>>] = useState('')

  //apartment service
  const { data: services, isLoading: isLoadingServices } = useRentoraApiApartmentServiceList({
    apartmentId: apartmentId!,
    unitId: id!,
  })

  //unit service
  const { data: unitServices, isLoading: isLoadingUnitServices } = useRentoraApiUnitServiceList({
    apartmentId: apartmentId!,
    unitId: id!,
  })

  //create unit service
  const { mutateAsync: createUnitService } = useRentoraApiCreateApartmentService({ apartmentId, unitId: id })

  const isLoading: boolean = useMemo(
    () => isLoadingServices || isLoadingUnitServices,
    [isLoadingServices, isLoadingUnitServices],
  )
  const addService = useCallback(async () => {
    try {
      await createUnitService({
        serviceId: selectedServiceId,
      })
      toast.success('Service added successfully!')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [createUnitService, selectedServiceId])

  if (isLoading)
    return <PageTableEmpty message="Loading..." icon={<Spinner />} description="Please wait while we load your data." />
  if (!services || services.length === 0)
    return (
      <PageTableEmpty
        message="No services found in this apartment"
        description="Please add a service to this apartment."
      />
    )

  return (
    <Card className="border-border justify-start overflow-auto rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 border-b pb-4">
        <h3>Services</h3>
        <p className="text-body-2 text-theme-secondary-600">Services will be automatically billed</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service-select" className="text-base font-semibold">
            Add Service
          </Label>

          <div className="flex items-center justify-center gap-x-2">
            <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
              <SelectTrigger id="service-select" className="flex-1">
                <SelectValue placeholder="Select service to add" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service: IApartmentService) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.serviceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="icon" onClick={addService} className="flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Services Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <RoomDetailServiceTableBody unitServices={unitServices} isLoading={isLoadingUnitServices} />
        </Table>
      </div>
    </Card>
  )
}

export default RoomDetailServices
