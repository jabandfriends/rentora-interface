import type { UseFormReturn } from 'react-hook-form'

import {
    DateTimePicker,
    FormControl,
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
    Textarea,
} from '@/components/common'
import { SelectRoomModal, Separator } from '@/components/ui'
import { ADHOC_INVOICE_STATUS } from '@/enum'
import type { ADHOC_INVOICE_FORM_SCHEMA_TYPE } from '@/types'

type IAdhocInvoiceInformation = {
    form: UseFormReturn<ADHOC_INVOICE_FORM_SCHEMA_TYPE>
}

const AdhocInvoiceInformation = ({ form }: IAdhocInvoiceInformation) => {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold">Invoice Information</h4>
                <p className="text-body-2 text-theme-secondary">Basic information about the invoice</p>
            </div>
            <Separator />
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Invoice title<span className="text-theme-error">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter invoice title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description<span className="text-theme-error">*</span>
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter invoice title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="desktop:grid-cols-2 grid gap-4">
                    <FormField
                        control={form.control}
                        name="invoiceDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Start date<span className="text-theme-error">*</span>
                                </FormLabel>
                                <FormControl>
                                    <DateTimePicker
                                        id={field.name}
                                        onChange={(val) => field.onChange(val?.toISOString())}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        value={field.value ? new Date(field.value) : undefined}
                                        placeholder="Select invoice date"
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    End date<span className="text-theme-error">*</span>
                                </FormLabel>
                                <FormControl>
                                    <DateTimePicker
                                        id={field.name}
                                        onChange={(val) => field.onChange(val?.toISOString())}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        value={field.value ? new Date(field.value) : undefined}
                                        placeholder="Select invoice date"
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full capitalize">
                                            <SelectValue placeholder="Select payment status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(ADHOC_INVOICE_STATUS).map(([key, value]) => (
                                            <SelectItem className="capitalize" key={key} value={value}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="unitId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <SelectRoomModal onRoomSelect={field.onChange} selectedRoomId={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdhocInvoiceInformation
