import { CheckCircle } from 'lucide-react'
import { useMemo } from 'react'

import { Button, Spinner } from '@/components/common'

type IContractNavigation = {
  currentStep: number
  handleFirstStepValidation: () => void
  handleSecondStepValidation: () => void
  handlePreviousStep: () => void
  isCreatingContract: boolean
  isContractCreated: boolean
}
const ContractNavigation = ({
  currentStep,
  handleFirstStepValidation,
  handleSecondStepValidation,
  handlePreviousStep,
  isCreatingContract,
  isContractCreated,
}: IContractNavigation) => {
  const isButtonDisabled: boolean = useMemo(() => {
    return isCreatingContract || isContractCreated
  }, [isCreatingContract, isContractCreated])
  return (
    <>
      {currentStep === 1 && (
        <div className="flex justify-end">
          <Button type="button" onClick={handleFirstStepValidation}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="flex items-center justify-between">
          <Button variant="outline" type="button" onClick={handlePreviousStep}>
            Back
          </Button>
          <Button type="button" onClick={handleSecondStepValidation}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="flex items-center justify-between">
          <Button variant="outline" type="button" onClick={handlePreviousStep}>
            Back
          </Button>
          <ContractCreateButton
            isButtonDisabled={isButtonDisabled}
            isCreatingContract={isCreatingContract}
            isContractCreated={isContractCreated}
          />
        </div>
      )}
    </>
  )
}

type IContractCreateButton = {
  isButtonDisabled: boolean
  isCreatingContract: boolean
  isContractCreated: boolean
}
const ContractCreateButton = ({ isButtonDisabled, isCreatingContract, isContractCreated }: IContractCreateButton) => {
  return (
    <Button className="flex items-center gap-2" type="submit" disabled={isButtonDisabled}>
      {isCreatingContract ? (
        <Spinner />
      ) : isContractCreated ? (
        <>
          <CheckCircle className="size-4" /> Contract Created
        </>
      ) : (
        'Create Contract'
      )}
    </Button>
  )
}

export default ContractNavigation
