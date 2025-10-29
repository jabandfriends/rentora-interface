import { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/feature'
import type { ISearchBarProps, ISuppliesUsage, ISupply, Maybe } from '@/types'

import SupplyQualityAssignment from './SupplyQualityAssignment'
import SupplySelectStep from './SupplySelectStep'

type ISupplySelectModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (suppliesUsage: Array<ISuppliesUsage>) => void
  initialSelectedSupplies: Maybe<Array<ISuppliesUsage>>
  supplies: Array<ISupply>
  onSearchChange: ISearchBarProps['onChange']
  onPageChange: (page: number) => void
  totalPages: number
  currentPage: number
  totalElements: number
}
const SupplySelectModal = ({
  open,
  onOpenChange,
  onConfirm,
  initialSelectedSupplies,
  supplies,
  onSearchChange,
  onPageChange,
  totalPages,
  currentPage,
  totalElements,
}: ISupplySelectModalProps) => {
  //form state step
  const [step, setStep]: [string, Dispatch<SetStateAction<string>>] = useState<string>('select')

  const [selectedSupplies, setSelectedSupplies]: [
    Array<ISuppliesUsage & Pick<ISuppliesUsage, 'supplyUsedQuantity'>>,
    Dispatch<SetStateAction<Array<ISuppliesUsage>>>,
  ] = useState<Array<ISuppliesUsage>>(initialSelectedSupplies || [])

  useEffect(() => {
    if (initialSelectedSupplies) {
      setSelectedSupplies(initialSelectedSupplies)
    }
  }, [initialSelectedSupplies])

  const handleStepBack = useCallback(() => {
    setStep('select')
  }, [])

  const handleSubmit = useCallback(() => {
    onConfirm(selectedSupplies)
  }, [onConfirm, selectedSupplies])

  //supply methods
  const handleQuantityChange = useCallback((supplyId: string, quantity: number) => {
    setSelectedSupplies((prev) =>
      prev.map((supply: ISuppliesUsage) =>
        supply.supplyId === supplyId ? { ...supply, supplyUsedQuantity: quantity } : supply,
      ),
    )
  }, [])
  const handleSelectSupply = useCallback((supply: ISupply, checked: boolean) => {
    setSelectedSupplies((prev) =>
      checked
        ? [...prev, { supplyId: supply.supplyId, supplyUsedQuantity: 1 }]
        : prev.filter((s) => s.supplyId !== supply.supplyId),
    )
  }, [])

  const isNextStepDisabled = useMemo(() => {
    return step === 'select' ? selectedSupplies.length === 0 : false
  }, [step, selectedSupplies])

  const { title, description }: { title: string; description: string } = useMemo(() => {
    return {
      title: step === 'select' ? 'Select Supplies' : 'Assign Quantities',
      description:
        step === 'select'
          ? 'Choose one or more supplies from the list below'
          : 'Enter the quantity used for each selected supply',
    }
  }, [step])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-4xl flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {step === 'select' ? (
          <SupplySelectStep
            supplies={supplies}
            selectedSupplies={selectedSupplies}
            onSearchChange={onSearchChange}
            onSelectSupply={handleSelectSupply}
            onPageChange={onPageChange}
            totalPages={totalPages}
            currentPage={currentPage}
            totalElements={totalElements}
          />
        ) : (
          <SupplyQualityAssignment
            supplies={supplies}
            selectedSupplies={selectedSupplies}
            onQuantityChange={handleQuantityChange}
          />
        )}

        <DialogFooter className="gap-2">
          {step === 'assign' && (
            <Button variant="outline" onClick={handleStepBack}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {step === 'select' ? (
            <Button onClick={() => setStep('assign')} disabled={isNextStepDisabled}>
              Next ({selectedSupplies.length} selected)
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Confirm Selection</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SupplySelectModal
