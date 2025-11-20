import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Card, Form } from '@/components/common'
import { MONTHLY_CONTRACT_SCHEMA, ROUTES } from '@/constants'
import { useRentoraApiCreateContract } from '@/hooks'
import type { ICreateContractRequestPayload, MonthlyContractFormData } from '@/types'
import { getErrorMessage } from '@/utilities'

import ContractMainInformation from './ContractMainInformation'
import ContractNavigation from './ContractNavigation'
import { ContractReview } from './ContractReview'
import ContractStartMeter from './ContractStartMeter'

const MonthlyContractBody = () => {
  const [currentStep, setCurrentStep]: [number, Dispatch<SetStateAction<number>>] = useState(1)
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()

  //api to create contract
  const {
    mutateAsync: createContract,
    isPending: isCreatingContract,
    isSuccess: isContractCreated,
  } = useRentoraApiCreateContract({ apartmentId })

  const form: UseFormReturn<MonthlyContractFormData> = useForm<MonthlyContractFormData>({
    resolver: zodResolver(MONTHLY_CONTRACT_SCHEMA),
    mode: 'onChange',
    defaultValues: {
      unitId: id,
      tenantId: '',
      rentalType: undefined,
      rentalPrice: '',
      depositAmount: '',
      advancePaymentMonths: '',
      termsAndConditions: '',
      specialConditions: '',
      autoRenewal: false,
      renewalNoticeDays: '',
      documentUrl: '',
      waterMeterStart: '',
      electricMeterStart: '',
    },
  })

  //go back step
  const handlePreviousStep = useCallback(() => {
    setCurrentStep(currentStep - 1)
  }, [currentStep])

  //change step
  const handleFirstStepValidation = useCallback(async () => {
    // only validate if moving forward
    const isValid: boolean = await form.trigger([
      'unitId',
      'tenantId',
      'rentalType',
      'rentalPrice',
      'termsAndConditions',
      'specialConditions',
      'autoRenewal',
      'renewalNoticeDays',
      'documentUrl',
      'startDate',
      'endDate',
    ])
    if (!isValid) {
      toast.error('Please fill or fix the following fields')
      return
    }
    setCurrentStep(2)
  }, [form])

  const handleSecondStepValidation = useCallback(async (): Promise<void> => {
    const isValid: boolean = await form.trigger(['waterMeterStart', 'electricMeterStart'])
    if (!isValid) {
      toast.error('Please fill or fix the following fields')
      return
    }
    setCurrentStep(3)
  }, [form])

  const handleSelectTenant = useCallback(
    (userId: string, name: string) => {
      form.setValue('tenantId', userId, { shouldValidate: true })
      form.setValue('tenantName', name, { shouldValidate: true })
    },
    [form],
  )

  const onSubmit = useCallback(
    async (data: MonthlyContractFormData) => {
      try {
        const { tenantName, ...rest } = data
        const payload: ICreateContractRequestPayload = {
          ...rest,
          rentalPrice: Number(data.rentalPrice),
          depositAmount: data.depositAmount ? Number(data.depositAmount) : undefined,
          advancePaymentMonths: data.advancePaymentMonths ? Number(data.advancePaymentMonths) : undefined,
          renewalNoticeDays: data.renewalNoticeDays ? Number(data.renewalNoticeDays) : undefined,
          startDate: format(data.startDate, 'yyyy-MM-dd'),
          endDate: format(data.endDate, 'yyyy-MM-dd'),
          waterMeterStart: Number(data.waterMeterStart),
          electricMeterStart: Number(data.electricMeterStart),
        }

        await createContract(payload)
        toast.success(`Tenant ${tenantName} Contract created successfully`)

        setTimeout(() => {
          navigate(ROUTES.allRoom.getPath(apartmentId))
        }, 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [navigate, apartmentId, createContract],
  )

  return (
    <Card className="space-y-4 rounded-2xl">
      <div className="border-theme-secondary-500 border-b pb-4">
        <h3>Create New Contract</h3>
        <p className="text-body-2 text-theme-secondary">Fill in the form below to create a new contract</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && <ContractMainInformation form={form} handleSelectTenant={handleSelectTenant} />}

          {currentStep === 2 && <ContractStartMeter form={form} />}
          {currentStep === 3 && <ContractReview form={form} />}
          <ContractNavigation
            currentStep={currentStep}
            handleFirstStepValidation={handleFirstStepValidation}
            handleSecondStepValidation={handleSecondStepValidation}
            handlePreviousStep={handlePreviousStep}
            isCreatingContract={isCreatingContract}
            isContractCreated={isContractCreated}
          />
        </form>
      </Form>
    </Card>
  )
}

export default MonthlyContractBody
