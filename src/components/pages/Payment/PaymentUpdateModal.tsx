import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, X } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/feature'
import { paymentUpdateFormSchema } from '@/constants'
import type { PaymentUpdateFormValues } from '@/types'

type IPaymentUpdateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PaymentUpdateModal = ({ open, onOpenChange }: IPaymentUpdateModalProps) => {
  const form = useForm<PaymentUpdateFormValues>({
    resolver: zodResolver(paymentUpdateFormSchema),
    defaultValues: {
      receiptImageFile: [],
    },
  })

  const handleSubmit = useCallback(async (values: PaymentUpdateFormValues) => {
    console.log(values)
  }, [])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receipt Upload</DialogTitle>
          <DialogDescription>Upload the payment receipt.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="receiptImageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      onFileReject={(_, message) => {
                        form.setError('receiptImageFile', {
                          message,
                        })
                      }}
                    >
                      <FileUploadDropzone className="text-body-2 flex-row flex-wrap border-dotted text-center">
                        <CloudUpload className="size-4" />
                        Drag and drop or
                        <FileUploadTrigger asChild>
                          <Button variant="link">choose files</Button>
                        </FileUploadTrigger>
                        to upload
                      </FileUploadDropzone>
                      <FileUploadList>
                        {field.value.map((file, index) => (
                          <FileUploadItem key={index} value={file}>
                            <div className="flex w-full flex-col items-center gap-y-2">
                              <div className="flex w-full">
                                <FileUploadItemMetadata />
                                <FileUploadItemDelete asChild>
                                  <Button variant="ghost" size="icon" className="size-7">
                                    <X />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </FileUploadItemDelete>
                              </div>
                              <FileUploadItemPreview className="w-68 h-fit" />
                            </div>
                          </FileUploadItem>
                        ))}
                      </FileUploadList>
                    </FileUpload>
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
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentUpdateModal
