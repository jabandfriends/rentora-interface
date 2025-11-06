import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, X } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Spinner } from '@/components/common'
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

  const handleSubmit = useCallback(
    async (values: PromptPayQRCodeValues) => {
      const payload: IUpdateApartmentPaymentServiceRequestPayload = {
        paymentId: apartmentPayment.apartmentPaymentId,
        promptPayImageFile: values.qrCode[0],
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
    return isUpdateApartmentPaymentPending || !form.formState.isValid || !form.formState.isDirty
  }, [isUpdateApartmentPaymentPending, form.formState.isValid, form.formState.isDirty])
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PromptPay QR Code</DialogTitle>
          <DialogDescription>Upload your PromptPay QR code to your apartment payment setting.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4 py-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
                {isUpdateApartmentPaymentPending ? <Spinner /> : 'Upload PromptPay QR Code'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ApartmentPaymentUploadQRModal
