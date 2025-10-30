import { zodResolver } from '@hookform/resolvers/zod'
import { ChartColumnIncreasing, PackageOpen } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputNumber,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import InfoTooltip from '@/components/feature/InfoTooltip'
import { Separator } from '@/components/ui'
import { supplyUpdateFormSchema } from '@/constants'
import { SupplyCategory } from '@/enum'
import { useRentoraApiUpdateSupply } from '@/hooks'
import type { ISupply, ISupplyUpdateFormSchema, ISupplyUpdatePayload, Maybe } from '@/types'
import { getErrorMessage } from '@/utilities'

type ISupplyUpdateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  supply: Maybe<ISupply>
}

const SupplyUpdateModal = ({ open, onOpenChange, supply }: ISupplyUpdateModalProps) => {
  const { mutateAsync: updateSupply, isPending: isUpdateSupplyPending } = useRentoraApiUpdateSupply()
  const form = useForm<ISupplyUpdateFormSchema>({
    resolver: zodResolver(supplyUpdateFormSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (supply) {
      form.reset({
        name: supply.supplyName,
        category: supply.supplyCategory,
        description: supply.supplyDescription ?? '',
        unit: supply.supplyUnit ?? '',
        stockQuantity: supply.supplyQuantity.toString(),
        minStock: supply.supplyMinStock.toString(),
        costPerUnit: supply.supplyUnitPrice.toString(),
      })
    }
  }, [supply, form])

  const handleSubmit = useCallback(
    async (data: ISupplyUpdateFormSchema): Promise<void> => {
      const payload: ISupplyUpdatePayload = {
        supplyId: supply!.supplyId,
        name: data.name,
        category: data.category,
        description: data.description,
        unit: data.unit,
        stockQuantity: Number(data.stockQuantity),
        minStock: Number(data.minStock),
        costPerUnit: Number(data.costPerUnit),
      }
      try {
        await updateSupply(payload)
        toast.success('Supply updated successfully')
        form.reset()
        onOpenChange(false)
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateSupply, onOpenChange, supply, form],
  )

  const isButtonDisabled: boolean = useMemo(() => {
    return isUpdateSupplyPending
  }, [isUpdateSupplyPending])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Supply</DialogTitle>
          <DialogDescription>Fill in the form below to update the supply.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-2">
              <div className="mb-4">
                <h4 className="flex items-center gap-x-2">
                  <PackageOpen size={18} /> Supply Information
                </h4>
                <p className="text-body-2 text-theme-secondary">
                  Fill in the form below to update the supply information.
                </p>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supply Name</FormLabel>
                    <FormControl>
                      <Input maxLength={100} placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <div>
                        <FormMessage />
                      </div>
                      {field.value?.length} / 100 characters
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value || ''}>
                            <SelectTrigger className="w-full capitalize">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(SupplyCategory).map((category: SupplyCategory) => (
                                <SelectItem className="capitalize" key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Unit of Measure{' '}
                          <InfoTooltip>Unit is the unit of the supply. e.g., kg, liter, piece</InfoTooltip>
                        </FormLabel>
                        <FormControl>
                          <Input maxLength={100} placeholder="Enter unit e.g., kg, liter, piece" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea maxLength={120} placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <div>
                        <FormMessage />
                      </div>
                      {field.value?.length} / 120 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="mb-4">
                <h4 className="flex items-center gap-x-2">
                  <ChartColumnIncreasing size={18} /> Stock Management
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <InputNumber maxLength={8} placeholder="Enter stock quantity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="minStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Min Stock
                          <InfoTooltip>Min stock is the minimum stock of the supply. e.g., 10</InfoTooltip>
                        </FormLabel>
                        <FormControl>
                          <InputNumber maxLength={8} placeholder="Enter min stock" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="costPerUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cost Per Unit (฿)
                      <InfoTooltip>Cost per unit is the cost of the supply per unit. e.g., 100.00</InfoTooltip>
                    </FormLabel>
                    <FormControl>
                      <InputNumber maxLength={8} placeholder="Enter cost per unit e.g., 100.00" decimal {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="desktop:flex grid grid-cols-2 gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isButtonDisabled}>
                {isUpdateSupplyPending ? <Spinner /> : 'Update Supply'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default SupplyUpdateModal
