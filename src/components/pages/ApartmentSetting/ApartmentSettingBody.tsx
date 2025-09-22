import { Plus, Save, X } from 'lucide-react'
import { useState } from 'react'

import {
  Button,
  Card,
  Input,
  InputNumber,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/common'
import { Badge } from '@/components/ui'

const ApartmentSettingBody = () => {
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
    <div>
      <div className="desktop:grid-cols-2 grid gap-6">
        {/* Basic Information */}
        <Card className="justify-start rounded-xl shadow">
          <div>
            <h5>Apartment Information</h5>
            <p className="text-body-2 text-theme-secondary">General details about your apartment complex</p>
          </div>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="apartmentName">Apartment Name</Label>
                <Input id="apartmentName" placeholder="Enter apartment name" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Contact Phone Number</Label>
                <InputNumber placeholder="Enter phone number" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                defaultValue="123 Main Street, Springfield, IL 62701"
                placeholder="Enter full address"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Country</Label>
                <InputNumber max={5} placeholder="Enter country" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">State</Label>
                <InputNumber max={5} placeholder="Enter state" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">City</Label>
                <InputNumber max={5} placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <InputNumber max={5} placeholder="Enter postal code" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="justify-start rounded-xl shadow">
          <div>
            <h5>Apartment Financial Setting</h5>
            <p className="text-body-2 text-theme-secondary">Configure payment due day and late fee</p>
          </div>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentDueDay">Payment Due Day</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment due day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4 space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="lateFee">Late Fee</Label>
                  <InputNumber decimal placeholder="Enter late fee" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gracePeriodDays">Grace Period Days</Label>
                  <InputNumber placeholder="Enter grace period days" />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <InputNumber max={13} placeholder="Enter tax ID" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Service */}
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
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add new amenity"
                onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
              />
              <InputNumber placeholder="Enter price" />
              <Button onClick={addAmenity} className="flex items-center gap-2" size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Utility Water and Electric */}
        <Card className="justify-start rounded-xl shadow">
          <div>
            <h5>Utility Water and Electric</h5>
            <p className="text-body-2 text-theme-secondary">
              Manage utility water and electric in your complex (will add to monthly rent)
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 space-y-2">
              <div className="space-y-2">
                <Label htmlFor="lateFee">Water Utility Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select water utility type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="meter">Meter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gracePeriodDays">Water Utility Price (THB/Unit)</Label>
                <InputNumber placeholder="Enter water utility price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gracePeriodDays">Water Utility Fixed Price (THB)</Label>
                <InputNumber placeholder="Enter water utility fixed price" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 space-y-2">
              <div className="space-y-2">
                <Label htmlFor="lateFee">Electric Utility Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select water utility type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="meter">Meter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gracePeriodDays">Electric Utility Price (THB/Unit)</Label>
                <InputNumber placeholder="Enter electric utility price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gracePeriodDays">Electric Utility Fixed Price (THB)</Label>
                <InputNumber placeholder="Enter electric utility fixed price" />
              </div>
            </div>
          </div>
        </Card>

        {/* Building Section */}
        <Card className="justify-start rounded-xl shadow">
          <div>
            <h5>Building Information</h5>
            <p className="text-body-2 text-theme-secondary">Add and manage buildings in your apartment complex</p>
          </div>
          <div className="space-y-4">
            {/* Building List */}
            <div className="space-y-2">
              <Label>Buildings</Label>
              <div className="flex flex-col gap-2">
                {/* Example building items */}
                <Badge variant="secondary" className="flex items-center gap-1">
                  Building A: 5 Floors
                  <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  Building B: 3 Floors
                  <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
                </Badge>
              </div>
            </div>

            {/* Add New Building */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="buildingName">Building Name</Label>
                <Input id="buildingName" placeholder="Enter building name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floors">Number of Floors</Label>
                <InputNumber placeholder="Floors" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="flex items-center gap-2" variant="outline">
                <Plus className="h-4 w-4" />
                Add Building
              </Button>
            </div>
          </div>
        </Card>

        {/* Payment Section */}
        <Card className="justify-start rounded-xl shadow">
          <div>
            <h5>Payment Methods</h5>
            <p className="text-body-2 text-theme-secondary">Manage bank accounts for rent payments</p>
          </div>
          <div className="space-y-4">
            {/* List of Current Payments */}
            <div className="flex flex-col gap-2">
              {/* Example payment items */}
              <Badge variant="secondary" className="flex items-center gap-1">
                Bangkok Bank - 123456789 - John Doe
                <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                Kasikorn Bank - 987654321 - Jane Smith
                <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
              </Badge>
            </div>

            {/* Add New Payment */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" placeholder="Enter bank name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account Number</Label>
                <InputNumber placeholder="Enter account number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder</Label>
                <Input placeholder="Enter account holder name" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="flex items-center gap-2" variant="outline">
                <Plus className="h-4 w-4" />
                Add Payment
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="size-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

export default ApartmentSettingBody
