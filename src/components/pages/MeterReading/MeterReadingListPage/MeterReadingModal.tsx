import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, InfoIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/common'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/feature'
import { updateMeterReadingFormSchema } from '@/constants'
import { useRentoraApiUnitUtilityUpdateMeterReading } from '@/hooks'
import type { IMeterReadingUpdateRequestPayload, IReportUtility, UpdateMeterReadingFormValues } from '@/types'
import { getErrorMessage } from '@/utilities'

type IMeterReadingModalProps = {
  room: IReportUtility
}

const MeterReadingModal = ({ room }: IMeterReadingModalProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const calculateTotal = useCallback((start: number, end: number) => {
    return end - start >= 0 ? (end - start).toFixed(2) : '0.00'
  }, [])

  //api mutate
  const { mutateAsync: updateMeterReading, isPending } = useRentoraApiUnitUtilityUpdateMeterReading({
    apartmentId: apartmentId!,
  })

  //form
  const form = useForm<UpdateMeterReadingFormValues>({
    resolver: zodResolver(updateMeterReadingFormSchema),
    defaultValues: {
      waterUnitUtilityId: room?.waterUnitUtilityId ?? '',
      waterStart: room?.waterMeterStart ?? 0,
      waterEnd: room?.waterMeterEnd ?? 0,
      electricUnitUtilityId: room?.electricUnitUtilityId ?? '',
      electricStart: room?.electricMeterStart ?? 0,
      electricEnd: room?.electricMeterEnd ?? 0,
    },
    mode: 'onChange',
  })

  //onsubmit
  const onSubmit = useCallback(
    (data: UpdateMeterReadingFormValues) => {
      const payload: IMeterReadingUpdateRequestPayload = {
        ...data,
      }
      try {
        updateMeterReading(payload)
        toast.success('Meter reading updated successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateMeterReading],
  )

  const [waterStart, waterEnd, electricStart, electricEnd] = form.watch([
    'waterStart',
    'waterEnd',
    'electricStart',
    'electricEnd',
  ])

  const isButtonDisabled: boolean = useMemo(
    () => !form.formState.isValid || isPending || !form.formState.isDirty,
    [form.formState.isValid, isPending, form.formState.isDirty],
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Reading - {room.roomName}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* --- Water Section --- */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="waterStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Water Start Unit{' '}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="text-theme-secondary size-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            ⚠️ You can change this, but be careful — it affects total usage.
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <InputNumber
                          maxLength={4}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="waterEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Water End Unit</FormLabel>
                      <FormControl>
                        <InputNumber
                          maxLength={4}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* --- Electricity Section --- */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="electricStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Electricity Start Unit{' '}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="text-theme-secondary size-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            ⚠️ You can change this, but be careful — it affects total usage.
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <InputNumber
                          maxLength={4}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="electricEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Electricity End Unit</FormLabel>
                      <FormControl>
                        <InputNumber
                          maxLength={4}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* --- Totals --- */}
            <div className="flex gap-4">
              <div className="bg-theme-primary/10 flex-1 rounded-md p-3">
                <p className="text-theme-primary text-body-2">Water Total</p>
                <p className="text-theme-primary font-semibold">{calculateTotal(waterStart ?? 0, waterEnd ?? 0)}</p>
              </div>

              <div className="bg-theme-secondary/10 flex-1 rounded-md p-3">
                <p className="text-theme-secondary text-body-2">Electricity Total</p>
                <p className="text-theme-secondary font-semibold">
                  {calculateTotal(electricStart ?? 0, electricEnd ?? 0)}
                </p>
              </div>
            </div>

            {/* --- Submit Button --- */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" disabled={isButtonDisabled} className="w-full">
                  Save Changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default MeterReadingModal
