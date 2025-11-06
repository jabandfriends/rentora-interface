import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, X } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
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
import InfoTooltip from '@/components/feature/InfoTooltip'
import { useRentoraApiUpdateApartmentPayment } from '@/hooks'
import type { IApartmentPayment, IUpdateApartmentPaymentServiceRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

const promptPayQRCodeSchema = z.object({
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  accountHolderName: z.string().optional(),
  promptpayNumber: z.string().optional(),
  qrCode: z.array(z.instanceof(File)).max(1, {
    message: 'Only 1 file is allowed',
  }),
})
type PromptPayQRCodeValues = z.infer<typeof promptPayQRCodeSchema>

type IApartmentPaymentUploadQRModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  apartmentPayment: IApartmentPayment
}
const ApartmentPaymentUploadQRModal = ({
  isOpen,
  onOpenChange,
  apartmentPayment,
}: IApartmentPaymentUploadQRModalProps) => {
  const form = useForm<PromptPayQRCodeValues>({
    resolver: zodResolver(promptPayQRCodeSchema),
    defaultValues: {
      qrCode: [],
    },
    mode: 'onChange',
  })

  const { mutateAsync: updateApartmentPayment, isPending: isUpdateApartmentPaymentPending } =
    useRentoraApiUpdateApartmentPayment()

  useEffect(() => {
    if (apartmentPayment) {
      form.reset({
        bankName: apartmentPayment.bankName,
        bankAccountNumber: apartmentPayment.bankAccountNumber,
        accountHolderName: apartmentPayment.accountHolderName,
        promptpayNumber: apartmentPayment.promptpayNumber ?? '',
        qrCode: [],
      })
    }
  }, [apartmentPayment, form])

  const handleSubmit = useCallback(
    async (values: PromptPayQRCodeValues) => {
      const payload: IUpdateApartmentPaymentServiceRequestPayload = {
        paymentId: apartmentPayment.apartmentPaymentId,
        promptPayImageFile: values.qrCode[0],
        bankName: values.bankName,
        bankAccountNumber: values.bankAccountNumber,
        accountHolderName: values.accountHolderName,
        promptpayNumber: values.promptpayNumber,
      }
      try {
        await updateApartmentPayment(payload)
        toast.success('PromptPay QR code uploaded successfully')
        onOpenChange(false) //close modal
        form.reset()
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateApartmentPayment, onOpenChange, apartmentPayment.apartmentPaymentId, form],
  )

  const isButtonDisabled = useMemo(() => {
    return isUpdateApartmentPaymentPending
  }, [isUpdateApartmentPaymentPending])
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Apartment Payment</DialogTitle>
          <DialogDescription>Edit your apartment payment setting.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4 py-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input maxLength={50} placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account Number</FormLabel>
                  <FormControl>
                    <Input maxLength={12} placeholder="Enter bank account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input maxLength={50} placeholder="Enter account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="promptpayNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PromptPay Number</FormLabel>
                  <FormControl>
                    <Input maxLength={10} placeholder="Enter promptpay number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qrCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="space-x-2">
                    PromptPay QR Code
                    <InfoTooltip>The QR code should be a PNG file with a resolution of 300x300 pixels.</InfoTooltip>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      onFileReject={(_, message) => {
                        form.setError('qrCode', {
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

              <Button className="desktop:w-auto w-full" type="submit" disabled={isButtonDisabled}>
                {isUpdateApartmentPaymentPending ? <Spinner /> : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ApartmentPaymentUploadQRModal
