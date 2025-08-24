import { Building, Calendar, CloudUpload, DollarSign, Phone, Upload, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/common'
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

const ApartmentCreateForm = () => {
  const form = useForm({
    defaultValues: {
      files: [],
      name: '',
      address: '',
      phone: '',
      taxId: '',
      paymentDueDate: '',
      lateFee: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Upload logo */}
          <Card className="rounded-lg py-4 hover:shadow-none">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div>
                    <FormLabel>
                      <Upload size={16} className="text-theme-primary" /> Upload Image
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
          </Card>

          {/* Apartment Detail */}
          <Card className="space-y-2 rounded-lg py-4 hover:shadow-none">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartment Name</FormLabel>
                  <FormControl>
                    <Input prefix={<Building size={16} />} placeholder="Enter apartment name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter apartment address" {...field} />
                  </FormControl>
                  <FormDescription>This is your apartment address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {/* Additional Details */}
          <Card className="space-y-2 rounded-lg py-4 hover:shadow-none">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input prefix={<Phone size={16} />} placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormDescription>This is your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tax ID" {...field} />
                  </FormControl>
                  <FormDescription>This is your tax ID.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {/* Payment & Late Fee Settings */}
          <Card className="space-y-2 rounded-lg py-4 hover:shadow-none">
            <FormField
              control={form.control}
              name="paymentDueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Due Date</FormLabel>
                  <FormControl>
                    <Input prefix={<Calendar size={16} />} placeholder="Enter payment due date" {...field} />
                  </FormControl>
                  <FormDescription>This is your payment due date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lateFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Late Fee(per day)</FormLabel>
                  <FormControl>
                    <Input prefix={<DollarSign size={16} />} placeholder="Enter late fee" {...field} />
                  </FormControl>
                  <FormDescription>This is your late fee.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
          <Button type="submit">Save Information</Button>
        </div>
      </form>
    </Form>
  )
}

export default ApartmentCreateForm
