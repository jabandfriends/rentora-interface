import { CloudUpload, Upload, X } from 'lucide-react'
import type { Control, UseFormReturn } from 'react-hook-form'

import { Button, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/common'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/feature'
import type { APARTMENT_FORM_VALUES } from '@/types'

type IApartUploadProps = {
  control: Control<APARTMENT_FORM_VALUES, any>
  form: UseFormReturn<APARTMENT_FORM_VALUES>
}
const ApartmentUpload = ({ control, form }: IApartUploadProps) => {
  return (
    <FormField
      control={control}
      name="files"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <div>
            <FormLabel>
              <Upload size={20} className="text-theme-primary" /> <h3>Upload Image</h3>
            </FormLabel>
            <FormDescription>
              Add your apartments logo to personalize documents, receipts, and tenant communications.
            </FormDescription>
          </div>

          <FormControl>
            <FileUpload
              value={field.value}
              onValueChange={field.onChange}
              accept="image/*"
              maxFiles={1}
              maxSize={5 * 1024 * 1024}
              onFileReject={(_, message) => {
                form.setError('files', {
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
  )
}

export default ApartmentUpload
