import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, Upload, X } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import z from 'zod'

import { Button, Form, FormField, FormItem, FormLabel } from '@/components/common'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/feature'
import { useRentoraApiUpdateContract } from '@/hooks'
import type { IContract, IUpdateContractRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

const contractSignedUploadFormSchema = z.object({
  signedContract: z.array(z.instanceof(File)),
})

type ContractSignedUploadFormValues = z.infer<typeof contractSignedUploadFormSchema>

type IContractSignedUploadProps = Pick<IContract, 'documentUrl' | 'contractId'>
const ContractSignedUpload = ({ documentUrl, contractId }: IContractSignedUploadProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { mutateAsync: updateContract, isPending: isUpdatingContract } = useRentoraApiUpdateContract({
    apartmentId: apartmentId!,
  })

  const form = useForm<ContractSignedUploadFormValues>({
    resolver: zodResolver(contractSignedUploadFormSchema),
    mode: 'onChange',
    defaultValues: {
      signedContract: [],
    },
  })

  const handleSubmit = useCallback(
    async (data: ContractSignedUploadFormValues) => {
      const payload: IUpdateContractRequestPayload = {
        contractId: contractId,
        documentFile: data.signedContract[0],
      }
      try {
        await updateContract(payload)
        toast.success('Contract signed successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [updateContract, contractId],
  )

  const isButtonDisabled: boolean = useMemo(() => {
    return isUpdatingContract || !form.formState.isValid || !form.formState.isDirty
  }, [isUpdatingContract, form.formState.isValid, form.formState.isDirty])

  if (documentUrl) {
    return null
  }

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="signedContract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Upload size={20} className="text-theme-primary" />
                Signed Contract
              </FormLabel>
              <FileUpload
                value={field.value}
                onValueChange={field.onChange}
                accept="application/pdf,.pdf"
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
                onFileReject={(_, message) => {
                  form.setError('signedContract', {
                    message,
                  })
                }}
              >
                <FileUploadDropzone className="text-body-2 border-theme-secondary-500 border-3 flex-row flex-wrap border-dotted text-center">
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
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button type="submit" className="flex items-center gap-x-2" disabled={isButtonDisabled}>
            <CloudUpload className="size-4" /> Upload
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContractSignedUpload
