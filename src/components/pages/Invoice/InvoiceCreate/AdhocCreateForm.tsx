import type { UseFormReturn } from 'react-hook-form'

import { Separator } from '@/components/ui'
import type { ADHOC_INVOICE_FORM_SCHEMA_TYPE } from '@/types'

import AdhocAdditional from './AdhocAdditional'
import AdhocBilling from './AdhocBilling'
import AdhocInvoiceInformation from './AdhocInvoiceInformation'

type IAdhocInvoiceInformation = {
    form: UseFormReturn<ADHOC_INVOICE_FORM_SCHEMA_TYPE>
}
const AdhocCreateForm = ({ form }: IAdhocInvoiceInformation) => {
    return (
        <div className="space-y-10">
            <AdhocInvoiceInformation form={form} />
            <Separator />
            <AdhocBilling form={form} />
            <Separator />
            <AdhocAdditional form={form} />
        </div>
    )
}

export default AdhocCreateForm
