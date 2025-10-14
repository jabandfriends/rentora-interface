import {
  Card,
  InputNumber,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'

const ApartmentUtilitySetting = () => {
  return (
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
  )
}

export default ApartmentUtilitySetting
