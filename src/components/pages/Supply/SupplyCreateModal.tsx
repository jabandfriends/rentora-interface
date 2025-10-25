import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Form,
  FormControl,
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
import { supplyCreateFormSchema } from '@/constants'
import { SupplyCategory } from '@/enum'
import type { ISupplyCreateFormSchema } from '@/types'

type ISupplyCreateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SupplyCreateModal = ({ open, onOpenChange }: ISupplyCreateModalProps) => {
  const form = useForm<ISupplyCreateFormSchema>({
    resolver: zodResolver(supplyCreateFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      category: undefined,
      description: '',
      unit: '',
      stockQuantity: '',
      minStock: '',
      costPerUnit: '',
    },
  })

  const handleSubmit = useCallback(async (data: ISupplyCreateFormSchema) => {
    console.log(data)
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Supply</DialogTitle>
          <DialogDescription>Fill in the form below to create a new supply.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supply Name</FormLabel>
                  <FormControl>
                    <Input maxLength={100} placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <SelectTrigger className="capitalize">
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea maxLength={120} placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Unit <InfoTooltip>Unit is the unit of the supply. e.g., kg, liter, piece</InfoTooltip>
                  </FormLabel>
                  <FormControl>
                    <Input maxLength={100} placeholder="Enter unit e.g., kg, liter, piece" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="costPerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Cost Per Unit{' '}
                    <InfoTooltip>Cost per unit is the cost of the supply per unit. e.g., 100.00</InfoTooltip>
                  </FormLabel>
                  <FormControl>
                    <InputNumber maxLength={8} placeholder="Enter cost per unit e.g., 100.00" decimal {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create Supply</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default SupplyCreateModal
