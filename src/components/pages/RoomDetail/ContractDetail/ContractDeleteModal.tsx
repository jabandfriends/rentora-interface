import { zodResolver } from '@hookform/resolvers/zod'
import type { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Form, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@/components/common'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/feature'
import { terminationFormSchema, type TerminationFormValues } from '@/types'

const ContractDeleteModal = ({
  isOpenDeleteModal,
  handleOpenModal,
  handleSubmit,
}: {
  isOpenDeleteModal: boolean
  //setState
  handleOpenModal: Dispatch<SetStateAction<boolean>>
  handleSubmit: (data: TerminationFormValues) => void
}) => {
  const form = useForm<TerminationFormValues>({
    resolver: zodResolver(terminationFormSchema),
    defaultValues: {
      terminationReason: '',
    },
    mode: 'onChange',
  })
  return (
    <Dialog open={isOpenDeleteModal} onOpenChange={handleOpenModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Terminate Contract</DialogTitle>
          <DialogDescription>Enter the reason for terminating the contract.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="terminationReason"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel htmlFor="username-1">Terminate reason</FormLabel>
                  <Textarea {...field} placeholder="Terminate reason" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="desktop:flex-row flex w-full flex-col justify-end gap-2">
              <DialogClose asChild>
                <Button className="desktop:w-auto w-full" type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="desktop:w-auto w-full" type="submit">
                Delete
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ContractDeleteModal
