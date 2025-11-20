import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, Upload, X } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import z from 'zod'

import {
  Button,
  DateTimePicker,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
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
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/feature'
import { ADHOC_INVOICE_CATEGORY, ADHOC_INVOICE_PAYMENT_STATUS, ADHOC_INVOICE_STATUS } from '@/enum'
import { useRentoraApiInvoiceDetails, useRentoraApiUpdateAdhocInvoice } from '@/hooks'
import type { IUpdateAdhocInvoicePayload } from '@/types'
import { getErrorMessage } from '@/utilities'

type INormalInvoiceUpdateModalProps = {
  selectedId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const normalUpdateInvoiceSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  category: z.enum(ADHOC_INVOICE_CATEGORY),
  amount: z.string().optional(),
  dueDate: z.string().optional(),
  paymentStatus: z.enum(ADHOC_INVOICE_PAYMENT_STATUS),
  invoiceStatus: z.enum(ADHOC_INVOICE_STATUS),
  uploadFile: z.array(z.instanceof(File)),
})

type INormalInvoiceUpdateModalFormValues = z.infer<typeof normalUpdateInvoiceSchema>
const NormalInvoiceUpdateModal = ({ open, onOpenChange, selectedId }: INormalInvoiceUpdateModalProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: invoiceData } = useRentoraApiInvoiceDetails({
    apartmentId: apartmentId,
    adhocInvoiceId: selectedId,
  })

  //update
  const { mutateAsync: updateAdhocInvoice, isPending: isUpdatePending } = useRentoraApiUpdateAdhocInvoice({
    apartmentId: apartmentId!,
  })

  const form = useForm<INormalInvoiceUpdateModalFormValues>({
    resolver: zodResolver(normalUpdateInvoiceSchema),
    defaultValues: {
      uploadFile: [],
    },
  })

  useEffect(() => {
    if (!invoiceData) return
    form.reset({
      title: invoiceData.title,
      description: invoiceData.description,
      category: invoiceData.category as ADHOC_INVOICE_CATEGORY,
      amount: invoiceData.finalAmount.toString(),
      dueDate: invoiceData.dueDate,
      paymentStatus: invoiceData.paymentStatus as ADHOC_INVOICE_PAYMENT_STATUS,
      invoiceStatus: invoiceData.status as ADHOC_INVOICE_STATUS,
      uploadFile: [],
    })
  }, [invoiceData, form])

  const handleUpdateAdhocInvoice = useCallback(
    async (data: INormalInvoiceUpdateModalFormValues) => {
      const payload: IUpdateAdhocInvoicePayload = {
        invoiceId: selectedId,
        title: data.title ?? '',
        description: data.description ?? '',
        category: data.category,
        amount: Number(data.amount),
        dueDate: data.dueDate ?? '',
        paymentStatus: data.paymentStatus,
        invocieStatus: data.invoiceStatus,
        ...(data.uploadFile[0] && { fileName: data.uploadFile[0].name || '' }),
        ...(data.uploadFile[0] && { receiptFile: data.uploadFile[0] }),
      }
      try {
        await updateAdhocInvoice(payload)
        toast.success('Invoice updated successfully')
        onOpenChange(false)
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [selectedId, updateAdhocInvoice, onOpenChange],
  )

  const isButtonDisabled: boolean = useMemo(() => isUpdatePending, [isUpdatePending])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
          <DialogDescription>Edit invoice details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(handleUpdateAdhocInvoice)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
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
                    <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ADHOC_INVOICE_CATEGORY).map((category) => (
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" maxLength={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      id={field.name}
                      onChange={(val) => field.onChange(val?.toISOString())}
                      onBlur={field.onBlur}
                      name={field.name}
                      error={!!fieldState.error}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <FormControl>
                      <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full capitalize">
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ADHOC_INVOICE_PAYMENT_STATUS).map((status) => (
                            <SelectItem className="capitalize" key={status} value={status}>
                              {status}
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
                name="invoiceStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Status</FormLabel>
                    <FormControl>
                      <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full capitalize">
                          <SelectValue placeholder="Select invoice status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ADHOC_INVOICE_STATUS).map((status) => (
                            <SelectItem className="capitalize" key={status} value={status}>
                              {status}
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

            <FormField
              control={form.control}
              name="uploadFile"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>
                      <Upload size={20} className="text-theme-primary" /> <h3>Upload Receipt</h3>
                    </FormLabel>
                    <FormDescription>Add your receipt image.</FormDescription>
                  </div>

                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      onFileReject={(_, message) => {
                        form.setError('uploadFile', {
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
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button variant="ghost" size="icon" className="size-7">
                                <X />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ))}
                      </FileUploadList>
                    </FileUpload>
                  </FormControl>
                  <FormDescription>Upload up to 1 image up to 5MB.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="desktop:w-auto w-full" type="submit" disabled={isButtonDisabled}>
                {isUpdatePending ? <Spinner /> : 'Save invoice'}
              </Button>
              <DialogClose asChild>
                <Button className="desktop:w-auto w-full" variant="outline">
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

export default NormalInvoiceUpdateModal
