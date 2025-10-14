import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Card, Input, InputNumber, Spinner } from '@/components/common'
import { Badge, PageTableEmpty } from '@/components/ui'
import { useRentoraApiApartmentServiceList } from '@/hooks'

const ApartmentMainServiceSetting = () => {
  const [amenities, setAmenities] = useState(['Swimming Pool', 'Gym', 'Parking', 'Laundry Room'])
  const [newAmenity, setNewAmenity] = useState('')

  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: apartmentServiceList, isLoading: isLoadingApartmentServiceList } = useRentoraApiApartmentServiceList({
    apartmentId: apartmentId!,
  })
  const addAmenity = () => {
    if (newAmenity.trim()) {
      setAmenities([...amenities, newAmenity.trim()])
      setNewAmenity('')
    }
  }

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index))
  }

  if (isLoadingApartmentServiceList) {
    return (
      <PageTableEmpty
        icon={<Spinner />}
        message="Loading your apartment service list"
        description="Please wait while we load your apartment service list"
      />
    )
  }

  return (
    <Card className="justify-start rounded-xl shadow">
      <div>
        <h5>Main Service</h5>
        <p className="text-body-2 text-theme-secondary">
          Manage main service in your complex (will add to monthly rent)
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          {/* current service */}
          <p className="text-body-2">Current Service</p>
          <div className="flex flex-wrap gap-2">
            {apartmentServiceList ? (
              apartmentServiceList.map((service, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {service.serviceName} : {service.price}฿
                  <X className="hover:text-theme-error h-3 w-3 cursor-pointer" onClick={() => removeAmenity(index)} />
                </Badge>
              ))
            ) : (
              <p className="text-body-2 text-theme-secondary">No service found</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} placeholder="Add new amenity" />
          <InputNumber placeholder="Enter price" />
          <Button onClick={addAmenity} className="flex items-center gap-2" size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ApartmentMainServiceSetting
