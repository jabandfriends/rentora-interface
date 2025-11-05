import { Plus } from 'lucide-react'

import { Button, Card, Input, InputNumber, Label } from '@/components/common'

import ApartmentPaymentCard from './ApartmentPaymentCard'

const ApartmentPaymentSetting = () => {
  return (
    <Card className="justify-start rounded-xl shadow">
      <div>
        <h4>Payment Methods</h4>
        <p className="text-body-2 text-theme-secondary">Manage bank accounts for rent payments</p>
      </div>
      <div className="space-y-4">
        {/* List of Current Payments */}
        <div className="flex flex-col gap-2">
          <ApartmentPaymentCard />
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
  )
}

export default ApartmentPaymentSetting
