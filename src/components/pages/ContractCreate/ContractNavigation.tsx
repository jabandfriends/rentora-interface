import { Button } from '@/components/common'

type IContractNavigation = {
  currentStep: number
  setCurrentStep: (value: number) => void
  onSubmit: () => void
}
const ContractNavigation = ({ currentStep, setCurrentStep, onSubmit }: IContractNavigation) => {
  return (
    <>
      {currentStep === 1 && (
        <div className="flex justify-end">
          <Button type="button" onClick={() => setCurrentStep(2)}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="flex items-center justify-between">
          <Button variant="outline" type="button" onClick={() => setCurrentStep(1)}>
            Back
          </Button>
          <Button type="button" onClick={() => setCurrentStep(3)}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="flex items-center justify-between">
          <Button variant="outline" type="button" onClick={() => setCurrentStep(2)}>
            Back
          </Button>
          <Button type="button" onClick={onSubmit}>
            Create Contract
          </Button>
        </div>
      )}
    </>
  )
}

export default ContractNavigation
