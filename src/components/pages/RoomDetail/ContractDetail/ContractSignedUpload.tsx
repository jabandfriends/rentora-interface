import { CloudUpload, Upload, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

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
import type { IContract } from '@/types'

type IContractSignedUploadProps = Pick<IContract, 'documentUrl'>
const ContractSignedUpload = ({ documentUrl }: IContractSignedUploadProps) => {
  const form = useForm<{ signedContract: Array<File> }>({
    defaultValues: {
      signedContract: [],
    },
  })

  if (documentUrl) {
    return null
  }

  return (
    <Form {...form}>
      <form className="space-y-2">
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
          <Button type="submit" className="flex items-center gap-x-2">
            <CloudUpload className="size-4" /> Upload
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContractSignedUpload
