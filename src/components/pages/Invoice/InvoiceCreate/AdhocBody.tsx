import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { Card, Form } from '@/components/common'
import { AdhocInvoiceSchema, ROUTES } from '@/constants'
import {
    ADHOC_INVOICE_CATEGORY,
    ADHOC_INVOICE_PAYMENT_STATUS,
    ADHOC_INVOICE_PRIORITY,
    ADHOC_INVOICE_STATUS,
} from '@/enum'
import { useRentoraApiCreateAdhocInvoice } from '@/hooks'
import type { ADHOC_INVOICE_FORM_SCHEMA_TYPE, ICreateAdhocInvoiceRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

import AdhocCreateForm from './AdhocCreateForm'

const AdhocBody = () => {
    const form: UseFormReturn<ADHOC_INVOICE_FORM_SCHEMA_TYPE> = useForm<ADHOC_INVOICE_FORM_SCHEMA_TYPE>({
        resolver: zodResolver(AdhocInvoiceSchema),
        defaultValues: {
            unitId: '',
            title: '',
            description: '',
            invoiceDate: '',
            dueDate: '',
            category: ADHOC_INVOICE_CATEGORY.MISCELLANEOUS,
            finalAmount: '0',
            paymentStatus: ADHOC_INVOICE_PAYMENT_STATUS.UNPAID,
            notes: '',
            includeInMonthly: false,
            priority: ADHOC_INVOICE_PRIORITY.NORMAL,
            status: ADHOC_INVOICE_STATUS.ACTIVE,
        },
        mode: 'onChange',
    })
    const navigate = useNavigate()
    const { apartmentId } = useParams<{ apartmentId: string }>()
    const { mutateAsync: createAdhocInvoice } = useRentoraApiCreateAdhocInvoice()

    const onSubmit = useCallback(
        async (data: ADHOC_INVOICE_FORM_SCHEMA_TYPE) => {
            const payload: ICreateAdhocInvoiceRequestPayload = {
                unitId: data.unitId,
                title: data.title,
                description: data.description ?? '',
                invoiceDate: data.invoiceDate,
                dueDate: data.dueDate!,
                category: data.category,
                finalAmount: Number(data.finalAmount),
                paymentStatus: data.paymentStatus,
                notes: data.notes ?? '',
                includeInMonthly: data.includeInMonthly,
                priority: data.priority,
                status: data.status,
            }
            try {
                if (!apartmentId) throw new Error('Apartment ID is required')
                await createAdhocInvoice({ apartmentId: apartmentId, payload })
                toast.success('Create Adhoc Invoice successfully')

                setTimeout(() => {
                    navigate(ROUTES.normalInvoice.getPath(apartmentId))
                }, 500)
            } catch (e) {
                toast.error(getErrorMessage(e))
            }
        },
        [apartmentId, createAdhocInvoice, navigate],
    )
    return (
        <Card className="space-y-4 rounded-2xl">
            <div className="border-theme-secondary-500 border-b pb-4">
                <h3>Create New Invoice</h3>
                <p className="text-body-2 text-theme-secondary">Fill in the form below to create a new invoice</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <AdhocCreateForm form={form} />
                </form>
            </Form>
        </Card>
    )
}

export default AdhocBody
