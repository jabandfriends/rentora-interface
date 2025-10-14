import { Plus, X } from 'lucide-react'
import { useState } from 'react'

import { Button, Card, Input, InputNumber } from '@/components/common'
import { Badge } from '@/components/ui'

const ApartmentMainServiceSetting = () => {
  const [amenities, setAmenities] = useState(['Swimming Pool', 'Gym', 'Parking', 'Laundry Room'])
  const [newAmenity, setNewAmenity] = useState('')

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setAmenities([...amenities, newAmenity.trim()])
      setNewAmenity('')
    }
  }

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index))
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
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {amenity} : 23฿
              <X className="hover:text-destructive h-3 w-3 cursor-pointer" onClick={() => removeAmenity(index)} />
            </Badge>
          ))}
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
