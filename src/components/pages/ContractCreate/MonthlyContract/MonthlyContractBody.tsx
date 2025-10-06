import { zodResolver } from '@hookform/resolvers/zod'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useDebounce } from '@uidotdev/usehooks'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import z from 'zod'

import {
  Button,
  Card,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputNumber,
  Textarea,
} from '@/components/common'
import { Switch } from '@/components/feature'
import { Calendar } from '@/components/ui'
import { DEFAULT_TENANT_LIST_DATA, MONTHLY_CONTRACT_SCHEMA, ROUTES } from '@/constants'
import { useRentoraApiCreateContract, useRentoraApiTenantList } from '@/hooks'
import type { ICreateContractRequestPayload } from '@/types'
import { cn, getErrorMessage } from '@/utilities'

import MonthlyUserCombobox from './MonthlyUserCombobox'

type MonthlyContractFormData = z.infer<typeof MONTHLY_CONTRACT_SCHEMA>

const MonthlyContractBody = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_TENANT_LIST_DATA.page,
  )
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()
  const { mutateAsync: createContract } = useRentoraApiCreateContract({ apartmentId })
  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const [search]: [string] = watch(['search'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const { data } = useRentoraApiTenantList({
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
  const form = useForm<MonthlyContractFormData>({
    resolver: zodResolver(MONTHLY_CONTRACT_SCHEMA),
    mode: 'onChange',
    defaultValues: {
      unitId: id,
      tenantId: '',
      guarantorName: '',
      guarantorPhone: '',
      guarantorIdNumber: '',
      rentalType: 'monthly',
      rentalPrice: '',
      depositAmount: '',
      advancePaymentMonths: '',
      lateFeeAmount: '',
      utilitiesIncluded: false,
      termsAndConditions: '',
      specialConditions: '',
      autoRenewal: false,
      renewalNoticeDays: '',
      documentUrl: '',
    },
  })

  const handleSelectTenant = useCallback(
    (userId: string) => {
      form.setValue('tenantId', userId)
    },
    [form],
  )

  const onSubmit = async (data: MonthlyContractFormData) => {
    try {
      const payload: ICreateContractRequestPayload = {
        ...data,
        rentalPrice: Number(data.rentalPrice),
        depositAmount: Number(data.depositAmount),
        advancePaymentMonths: Number(data.advancePaymentMonths),
        lateFeeAmount: Number(data.lateFeeAmount),
        renewalNoticeDays: Number(data.renewalNoticeDays),
        startDate: format(data.startDate, 'yyyy-MM-dd'),
        endDate: format(data.endDate, 'yyyy-MM-dd'),
      }

      await createContract(payload)
      toast.success('Contract created successfully')
      form.reset()

      setTimeout(() => {
        navigate(ROUTES.allRoom.getPath(apartmentId))
      }, 1000)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Card className="space-y-4 rounded-2xl">
      <div className="border-theme-secondary-500 border-b pb-4">
        <h3>Create New Contract</h3>
        <p className="text-body-2 text-theme-secondary">Fill in the form below to create a new contract</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormLabel>
              Tenant
              <span className="text-theme-error">*</span>
            </FormLabel>
            <MonthlyUserCombobox onSelectTenant={handleSelectTenant} users={data} onSearchTenant={handleSearchTenant} />
          </div>
          <div className="desktop:grid-cols-2 grid gap-4">
            <FormField
              control={form.control}
              name="guarantorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Guarantor Name <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter guarantor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guarantorPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Guarantor Phone <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0626063049" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guarantorIdNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Guarantor ID Number <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="1103700123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Start Date <span className="text-theme-error">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'flex w-full justify-between pl-3 text-left font-normal',
                            !field.value && 'text-theme-secondary',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="bg-theme-light w-auto rounded-xl p-0 shadow" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    End Date <span className="text-theme-error">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'flex w-full justify-between pl-3 text-left font-normal',
                            !field.value && 'text-theme-secondary',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="bg-theme-light w-auto rounded-xl p-0 shadow" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rentalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Rental Price <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder="12000.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depositAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Deposit Amount <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder="24000.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="advancePaymentMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Advance Payment (Months) <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lateFeeAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Late Fee Amount <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder="500.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="renewalNoticeDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Renewal Notice (Days) <span className="text-theme-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputNumber placeholder="30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/contract.pdf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms and Conditions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter terms and conditions..." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Conditions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter special conditions..." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="desktop:grid-cols-2 grid gap-4">
            <FormField
              control={form.control}
              name="utilitiesIncluded"
              render={({ field }) => (
                <FormItem className="border-theme-secondary-300 flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Utilities Included</FormLabel>
                    <FormDescription>Include utilities in rental price</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autoRenewal"
              render={({ field }) => (
                <FormItem className="border-theme-secondary-300 flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Auto Renewal</FormLabel>
                    <FormDescription>Automatically renew contract</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit">Create Contract</Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default MonthlyContractBody
