import { useDebounce } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/feature'
import { DEFAULT_SUPPLY_LIST_DATA } from '@/constants'
import { useRentoraApiSupplyList } from '@/hooks'
import type { ISearchBarProps, ISuppliesUsage, ISupply, Maybe } from '@/types'

import SupplyQualityAssignment from './SupplyQualityAssignment'
import SupplySelectStep from './SupplySelectStep'

type ISupplySelectModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (suppliesUsage: Array<ISuppliesUsage>) => void
  initialSelectedSupplies: Maybe<Array<ISuppliesUsage>>
}
const SupplySelectModal = ({ open, onOpenChange, onConfirm, initialSelectedSupplies }: ISupplySelectModalProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  //form state step
  const [step, setStep]: [string, Dispatch<SetStateAction<string>>] = useState<string>('select')

  //pagination state for supply list
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_SUPPLY_LIST_DATA.page,
  )

  const [selectedSupplies, setSelectedSupplies]: [
    Array<ISuppliesUsage>,
    Dispatch<SetStateAction<Array<ISuppliesUsage>>>,
  ] = useState<Array<ISuppliesUsage>>(initialSelectedSupplies || [])

  const { watch, setValue } = useForm<{
    search: string
  }>({
    defaultValues: {
      search: '',
    },
  })
  const [search]: [string] = watch(['search'])
  const debouncedSearch = useDebounce(search ? search : undefined, 500)

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_SUPPLY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  //get all supplies
  const {
    data: supplies,
    pagination: { totalPages, totalElements },
  } = useRentoraApiSupplyList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: 5,
      search: debouncedSearch,
    },
  })

  const handlePageChange = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }, [])

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
            onSearchChange={handleSearchChange}
            onSelectSupply={handleSelectSupply}
            onPageChange={handlePageChange}
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
