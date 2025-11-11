import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputNumber,
  Popover,
  Spinner,
  Textarea,
} from '@/components/common'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/feature'
import { Calendar } from '@/components/ui'
import { contractUpdateFormSchema, endMonth, startMonth } from '@/constants'
import { useRentoraApiUpdateContract } from '@/hooks'
import type { ContractUpdateFormValues, IContract, IUpdateContractRequestPayload } from '@/types'
import { cn, getErrorMessage } from '@/utilities'

type IContractUpdateModalProps = {
  contract: IContract
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ContractUpdateModal = ({ contract, open, onOpenChange }: IContractUpdateModalProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const form: UseFormReturn<ContractUpdateFormValues> = useForm<ContractUpdateFormValues>({
    resolver: zodResolver(contractUpdateFormSchema),
    mode: 'onChange',
  })

  const { mutateAsync: updateContract, isPending: isUpdateContractPending } = useRentoraApiUpdateContract({
    apartmentId: apartmentId!,
  })

  const isButtonDisabled = useMemo(() => {
    return isUpdateContractPending || !form.formState.isValid || !form.formState.isDirty
  }, [isUpdateContractPending, form.formState.isValid, form.formState.isDirty])

  useEffect(() => {
    if (contract) {
      form.reset({
        endDate: contract.endDate ? new Date(contract.endDate) : undefined,
        rentalPrice: contract.rentalPrice.toString(),
        depositAmount: contract.depositAmount.toString(),
        advancePaymentMonths: contract.advancePaymentMonths.toString(),
        termsAndConditions: contract.termsAndConditions,
        specialConditions: contract.specialConditions,
      })
    }
  }, [contract, form])

  const handleSubmit = useCallback(
    async (data: ContractUpdateFormValues) => {
      const payload: IUpdateContractRequestPayload = {
        contractId: contract.contractId,
        endDate: data.endDate ? format(data.endDate, 'yyyy-MM-dd') : undefined,
        ...(data.rentalPrice && { rentalPrice: Number(data.rentalPrice) }),
        ...(data.depositAmount && { depositAmount: Number(data.depositAmount) }),
        ...(data.advancePaymentMonths && { advancePaymentMonths: Number(data.advancePaymentMonths) }),
        termsAndConditions: data.termsAndConditions,
        specialConditions: data.specialConditions,
      }
      try {
        await updateContract(payload)
        toast.success('Contract updated successfully')
        onOpenChange(false)
        form.reset()
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateContract, contract.contractId, onOpenChange, form],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Contract</DialogTitle>
          <DialogDescription>Update the contract information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="desktop:grid-cols-2 grid gap-2">
              <FormField
                control={form.control}
                name="advancePaymentMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Advance Payment (Months)</FormLabel>
                    <FormControl>
                      <InputNumber suffix="Month" maxLength={2} placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover
                      trigger={
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'flex w-full justify-between pl-3 text-left font-normal',
                              !field.value && 'text-theme-secondary',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      }
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        startMonth={startMonth}
                        endMonth={endMonth}
                        disabled={(date) => {
                          const today = new Date()
                          today.setHours(0, 0, 0, 0) // set to midnight
                          const checkDate = new Date(date)
                          checkDate.setHours(0, 0, 0, 0)
                          return checkDate < today
                        }}
                        className="pointer-events-auto"
                      />
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Rental Price and Deposit Amount */}
            <div className="desktop:grid-cols-2 grid gap-2">
              <FormField
                control={form.control}
                name="rentalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rental Price</FormLabel>
                    <FormControl>
                      <InputNumber suffix="THB" maxLength={8} decimal placeholder="12000.00" {...field} />
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
                    <FormLabel>Deposit Amount</FormLabel>
                    <FormControl>
                      <InputNumber suffix="THB" maxLength={8} decimal placeholder="12000.00" {...field} />
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
                    <Textarea maxLength={100} placeholder="Enter terms and conditions..." {...field} />
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
                    <Textarea maxLength={100} placeholder="Enter special conditions..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isButtonDisabled} className="desktop:w-auto w-full" type="submit">
                {isUpdateContractPending ? <Spinner /> : 'Save Changes'}
              </Button>
              <DialogClose asChild>
                <Button className="desktop:w-auto w-full" type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ContractUpdateModal
