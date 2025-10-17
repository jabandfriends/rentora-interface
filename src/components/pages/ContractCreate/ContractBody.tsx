import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { format } from 'date-fns'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Card, Form } from '@/components/common'
import { DEFAULT_TENANT_LIST_DATA, MONTHLY_CONTRACT_SCHEMA, ROUTES } from '@/constants'
import { useRentoraApiCreateContract, useRentoraApiTenantList } from '@/hooks'
import type { ICreateContractRequestPayload, MonthlyContractFormData } from '@/types'
import { getErrorMessage } from '@/utilities'

import ContractMainInformation from './ContractMainInformation'
import ContractNavigation from './ContractNavigation'
import { ContractReview } from './ContractReview'
import ContractStartMeter from './ContractStartMeter'

const MonthlyContractBody = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_TENANT_LIST_DATA.page,
  )
  const [currentStep, setCurrentStep]: [number, Dispatch<SetStateAction<number>>] = useState(1)
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()

  //api to create contract
  const { mutateAsync: createContract } = useRentoraApiCreateContract({ apartmentId })

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const [search]: [string] = watch(['search'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const { data: tenantsData } = useRentoraApiTenantList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_TENANT_LIST_DATA.size,
      name: debouncedSearch,
    },
  })

  const handleSearchTenant = useCallback(
    (value: string) => {
      setCurrentPage(DEFAULT_TENANT_LIST_DATA.page)
      setValue('search', value)
    },
    [setValue],
  )

  const form: UseFormReturn<MonthlyContractFormData> = useForm<MonthlyContractFormData>({
    resolver: zodResolver(MONTHLY_CONTRACT_SCHEMA),
    mode: 'onChange',
    defaultValues: {
      unitId: id,
      tenantId: '',
      guarantorName: '',
      guarantorPhone: '',
      guarantorIdNumber: '',
      rentalType: undefined,
      rentalPrice: '',
      depositAmount: '',
      advancePaymentMonths: '',
      lateFeeAmount: '',
      utilitiesIncluded: true,
      termsAndConditions: '',
      specialConditions: '',
      autoRenewal: false,
      renewalNoticeDays: '',
      documentUrl: '',
      waterMeterStart: '',
      electricMeterStart: '',
    },
  })

  //change step
  const handleStepChange = useCallback(
    async (nextStep: number) => {
      // only validate if moving forward
      if (nextStep > currentStep) {
        const isValid: boolean = await form.trigger([
          'unitId',
          'tenantId',
          'guarantorName',
          'guarantorPhone',
          'guarantorIdNumber',
          'rentalType',
          'rentalPrice',
          'depositAmount',
          'advancePaymentMonths',
          'lateFeeAmount',
          'utilitiesIncluded',
          'termsAndConditions',
          'specialConditions',
          'autoRenewal',
          'renewalNoticeDays',
          'documentUrl',
        ])
        if (!isValid) {
          toast.error('Please fill or fix the following fields')
          return
        }
      }

      // if valid or going backward, allow step change
      setCurrentStep(nextStep)
    },
    [form, currentStep],
  )

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
          depositAmount: Number(data.depositAmount),
          advancePaymentMonths: Number(data.advancePaymentMonths),
          lateFeeAmount: Number(data.lateFeeAmount),
          renewalNoticeDays: Number(data.renewalNoticeDays),
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
          {currentStep === 1 && (
            <ContractMainInformation
              form={form}
              tenantsData={tenantsData}
              handleSelectTenant={handleSelectTenant}
              handleSearchTenant={handleSearchTenant}
            />
          )}

          {currentStep === 2 && <ContractStartMeter form={form} />}
          {currentStep === 3 && <ContractReview form={form} />}
          <ContractNavigation
            currentStep={currentStep}
            setCurrentStep={handleStepChange}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </Card>
  )
}

export default MonthlyContractBody
