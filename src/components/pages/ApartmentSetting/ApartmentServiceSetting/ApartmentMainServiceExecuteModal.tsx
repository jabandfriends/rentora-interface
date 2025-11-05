import { zodResolver } from '@hookform/resolvers/zod'
import { type PropsWithChildren, useEffect, useMemo } from 'react'
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
  Spinner,
} from '@/components/common'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/feature'
import { apartmentMainServiceSchema } from '@/constants'
import { ServiceCategory } from '@/enum'
import type { ApartmentMainServiceSchema, IApartmentService } from '@/types'

type IApartmentMainServiceExecuteModal = PropsWithChildren<{
  apartmentService?: IApartmentService
  onSubmit: (data: ApartmentMainServiceSchema) => void
  isPending: boolean
}>
const ApartmentMainServiceExecuteModal = ({
  apartmentService,
  children,
  onSubmit,
  isPending,
}: IApartmentMainServiceExecuteModal) => {
  const { title, description, buttonText } = useMemo<{ title: string; description: string; buttonText: string }>(() => {
    if (apartmentService) {
      return {
        title: `Edit ${apartmentService.serviceName}`,
        description: `Edit service ${apartmentService.serviceName} for your apartment`,
        buttonText: 'Update Service',
      }
    }
    return {
      title: 'Add New Service',
      description: 'Add new service for your apartment',
      buttonText: 'Create Service',
    }
  }, [apartmentService])

  const form = useForm<ApartmentMainServiceSchema>({
    resolver: zodResolver(apartmentMainServiceSchema),
    defaultValues: {
      isActive: true,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (apartmentService) {
      form.reset({
        serviceName: apartmentService.serviceName,
        price: apartmentService.price.toString(),
        category: apartmentService.category,
        isActive: apartmentService.isActive,
      })
    }
  }, [apartmentService, form])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input maxLength={50} placeholder="Enter service name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <InputNumber placeholder="Enter price" decimal maxLength={8} {...field} />
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
                    <Select
                      key={field.value?.toString()}
                      onValueChange={field.onChange}
                      value={field.value?.toString() ?? ''}
                    >
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ServiceCategory).map((category: ServiceCategory) => (
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
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Select
                      key={field.value?.toString()}
                      onValueChange={(val: string) => {
                        if (val === 'true') field.onChange(true)
                        else if (val === 'false') field.onChange(false)
                        else field.onChange(val)
                      }}
                      value={String(field.value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select active status" className="w-full" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button className="desktop:w-auto w-full" type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="desktop:w-auto w-full" type="submit" disabled={isPending}>
                  {isPending ? <Spinner /> : buttonText}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ApartmentMainServiceExecuteModal
