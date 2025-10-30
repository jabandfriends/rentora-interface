import { AlertCircle } from 'lucide-react'

import { InputNumber, Label } from '@/components/common'
import { ScrollArea } from '@/components/feature'
import { Alert, AlertDescription } from '@/components/ui'
import type { ISuppliesUsage, ISupply, Maybe } from '@/types'
import { formatCurrency } from '@/utilities'

type ISupplyQualityAssignmentProps = {
  selectedSupplies: Array<ISuppliesUsage>
  supplies: Array<ISupply>
  onQuantityChange: (supplyId: string, quantity: number) => void
}

const SupplyQualityAssignment = ({ selectedSupplies, supplies, onQuantityChange }: ISupplyQualityAssignmentProps) => {
  return (
    <ScrollArea className="-mx-6 flex-1 px-6">
      <div className="space-y-4">
        <Alert>
          <AlertCircle className="size-4" />
          <AlertDescription className="text-theme-primary">
            Enter the quantity used for each supply. Maximum quantity cannot exceed the available stock.
          </AlertDescription>
        </Alert>

        {selectedSupplies.map((selectedSupply: ISuppliesUsage) => {
          const supplyData: Maybe<ISupply> = supplies.find((s) => s.supplyId === selectedSupply.supplyId)
          if (!supplyData) return null
          return (
            <div
              key={supplyData.supplyId}
              className="bg-card border-theme-secondary-300 space-y-3 rounded-lg border p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{supplyData.supplyName}</h4>
                  <p className="text-theme-secondary text-body-2">
                    Available: {supplyData.supplyQuantity} {supplyData.supplyUnit}
                  </p>
                  {supplyData.supplyDescription && (
                    <p className="text-theme-secondary text-body-2 mt-1">{supplyData.supplyDescription}</p>
                  )}
                </div>
                <div className="text-body-2 text-right">
                  <div className="font-medium">
                    {formatCurrency(supplyData.supplyUnitPrice)}/{supplyData.supplyUnit}
                  </div>
                  {supplyData.supplyQuantity > 0 && (
                    <div className="text-theme-secondary">
                      Total: {formatCurrency(supplyData.supplyUnitPrice * selectedSupply.supplyUsedQuantity)}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`quantity-${supplyData.supplyId}`}>Used Quantity ({supplyData.supplyUnit})</Label>
                <InputNumber
                  id={`quantity-${supplyData.supplyId}`}
                  maxLength={8}
                  value={selectedSupply.supplyUsedQuantity}
                  onChange={(e) => onQuantityChange(supplyData.supplyId, Number(e.target.value))}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

export default SupplyQualityAssignment
