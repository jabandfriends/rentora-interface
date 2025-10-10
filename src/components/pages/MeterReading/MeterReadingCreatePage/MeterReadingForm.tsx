import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import z from 'zod'

import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputNumber,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { useRentoraApiUnitList } from '@/hooks'
import type { IUnit } from '@/types'

const formSchema = z.object({
  readingDate: z.string(),
  rooms: z.array(
    z.object({
      unitId: z.string(),
      unitName: z.string(),
      waterStart: z.number().optional(),
      waterEnd: z.number().optional(),
      electricStart: z.number().optional(),
      electricEnd: z.number().optional(),
    }),
  ),
})

type FormValues = z.infer<typeof formSchema>

const MeterReadingForm = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  // Filter form
  const filterForm = useForm({
    defaultValues: { buildingName: '' },
  })
  const [buildingName] = filterForm.watch(['buildingName'])
  const debouncedBuildingName = useDebounce(buildingName, 300)

  // Rooms API
  const { data: rooms } = useRentoraApiUnitList({
    apartmentId: apartmentId!,
    params: {
      buildingName: debouncedBuildingName,
    },
    enabled: !!debouncedBuildingName, // only fetch after filters selected
  })

  // Meter reading form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { readingDate: '', rooms: [] },
    mode: 'onChange',
  })
  const { fields, replace } = useFieldArray({ control: form.control, name: 'rooms' })

  useEffect(() => {
    if (rooms?.length) {
      replace(
        rooms.map((room: IUnit) => ({
          unitId: room.id,
          unitName: room.unitName,
          waterStart: 0,
          waterEnd: 0,
          electricStart: 0,
          electricEnd: 0,
        })),
      )
    } else {
      replace([])
    }
  }, [rooms, replace])

  const calculateTotal = (start?: number, end?: number) => ((end ?? 0) - (start ?? 0)).toFixed(2)

  const onSubmit = (data: FormValues) => console.log('Form Data:', data)

  return (
    <div className="space-y-6">
      {/* --- Filter Section --- */}
      <Card className="rounded-2xl p-6">
        <div className="flex flex-wrap gap-4">
          <Form {...filterForm}>
            <FormField
              control={filterForm.control}
              name="buildingName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select building" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Building A">Building A</SelectItem>
                        <SelectItem value="Building B">Building B</SelectItem>
                        {/* map from API if needed */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="readingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reading Date</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </div>
      </Card>

      {/* --- Meter Reading Form --- */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((fieldItem, index) => (
            <Card key={fieldItem.id} className="border-theme-secondary-300 rounded-2xl border p-4 shadow">
              <h3 className="font-medium">{fieldItem.unitName}</h3>
              <div className="desktop:grid-cols-2 grid grid-cols-1 gap-4">
                {/* Water */}
                <div className="space-y-2">
                  <h4 className="font-medium">Water Meter</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.waterStart`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Unit</FormLabel>
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
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.waterEnd`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Unit</FormLabel>
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
                  <p>
                    Total:{' '}
                    {calculateTotal(form.watch(`rooms.${index}.waterStart`), form.watch(`rooms.${index}.waterEnd`))}
                  </p>
                </div>

                {/* Electricity */}
                <div className="space-y-2">
                  <h4 className="font-medium">Electricity Meter</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.electricStart`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Unit</FormLabel>
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
                    <FormField
                      control={form.control}
                      name={`rooms.${index}.electricEnd`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Unit</FormLabel>
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
                  <p>
                    Total:{' '}
                    {calculateTotal(
                      form.watch(`rooms.${index}.electricStart`),
                      form.watch(`rooms.${index}.electricEnd`),
                    )}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <Button type="submit" className="flex w-full items-center gap-2">
            <Plus className="size-4" /> Create Meter Reading
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default MeterReadingForm
