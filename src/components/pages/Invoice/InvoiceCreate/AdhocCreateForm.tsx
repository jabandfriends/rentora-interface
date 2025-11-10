import type { UseFormReturn } from 'react-hook-form'

import { Separator } from '@/components/ui'
import type { ADHOC_INVOICE_FORM_SCHEMA_TYPE } from '@/types'

import AdhocAdditional from './AdhocAdditional'
import AdhocBilling from './AdhocBilling'
import AdhocButton from './AdhocButton'
import AdhocInvoiceInformation from './AdhocInvoiceInformation'

type IAdhocInvoiceInformation = {
    form: UseFormReturn<ADHOC_INVOICE_FORM_SCHEMA_TYPE>
    onSubmit: (data: ADHOC_INVOICE_FORM_SCHEMA_TYPE) => void
}
const AdhocCreateForm = ({ form, onSubmit }: IAdhocInvoiceInformation) => {
    return (
        <form className="space-y-10">
            <AdhocInvoiceInformation form={form} />
            <Separator />
            <AdhocBilling form={form} />
            <Separator />
            <AdhocAdditional form={form} />
            <AdhocButton onSubmit={form.handleSubmit(onSubmit)} />
        </form>
    )
}

export default AdhocCreateForm
