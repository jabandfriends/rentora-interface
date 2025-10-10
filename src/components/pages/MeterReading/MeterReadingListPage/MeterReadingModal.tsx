import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, InfoIcon } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/feature'
import type { IReportUtility } from '@/types'

type IMeterReadingModalProps = {
  room: IReportUtility
}
const formSchema = z
  .object({
    waterMeterStart: z.number({ error: 'Water start is required' }).min(0, 'Must be 0 or greater'),
    waterMeterEnd: z.number({ error: 'Water end is required' }).min(0, 'Must be 0 or greater'),
    electricMeterStart: z.number({ error: 'Electric start is required' }).min(0, 'Must be 0 or greater'),
    electricMeterEnd: z.number({ error: 'Electric end is required' }).min(0, 'Must be 0 or greater'),
  })
  .superRefine((data, ctx) => {
    // 🔹 Water
    if (data.waterMeterStart > data.waterMeterEnd) {
      ctx.addIssue({
        code: 'custom',
        path: ['waterMeterEnd'],
        message: 'Water end must be greater than or equal to start',
      })
    }

    // 🔹 Electric
    if (data.electricMeterStart > data.electricMeterEnd) {
      ctx.addIssue({
        code: 'custom',
        path: ['electricMeterEnd'],
        message: 'Electric end must be greater than or equal to start',
      })
    }
  })
const MeterReadingModal = ({ room }: IMeterReadingModalProps) => {
  const calculateTotal = useCallback((start: number, end: number) => {
    return end - start >= 0 ? (end - start).toFixed(2) : '0.00'
  }, [])

  //form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      waterMeterStart: room?.waterMeterStart ?? 0,
      waterMeterEnd: room?.waterMeterEnd ?? 0,
      electricMeterStart: room?.electricMeterStart ?? 0,
      electricMeterEnd: room?.electricMeterEnd ?? 0,
    },
    mode: 'onChange',
  })

  //onsubmit
  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    console.log(data) //api
  }, [])

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
                  name="waterMeterStart"
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
                        <InputNumber {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="waterMeterEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Water End Unit</FormLabel>
                      <FormControl>
                        <InputNumber {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                  name="electricMeterStart"
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
                        <InputNumber {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="electricMeterEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Electricity End Unit</FormLabel>
                      <FormControl>
                        <InputNumber {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                <p className="text-theme-primary font-semibold">
                  {calculateTotal(form.watch('waterMeterStart') ?? 0, form.watch('waterMeterEnd') ?? 0)}
                </p>
              </div>

              <div className="bg-theme-secondary/10 flex-1 rounded-md p-3">
                <p className="text-theme-secondary text-body-2">Electricity Total</p>
                <p className="text-theme-secondary font-semibold">
                  {calculateTotal(form.watch('electricMeterStart') ?? 0, form.watch('electricMeterEnd') ?? 0)}
                </p>
              </div>
            </div>

            {/* --- Submit Button --- */}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default MeterReadingModal
