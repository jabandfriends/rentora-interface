import { Plus } from 'lucide-react'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { InvoiceCreateForm } from '@/components/pages/Invoice/InvoiceCreate'
import { ROUTES } from '@/constants'
import { useRentoraApiCreateAdhocInvoice } from '@/hooks'
import type { ADHOC_INVOICE_FORM_SCHEMA_TYPE, ICreateAdhocInvoiceRequestPayload } from '@/types'
import { getErrorMessage } from '@/utilities'

const InvoiceCreatePage = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { mutateAsync: createAdhocInvoice, isPending } = useRentoraApiCreateAdhocInvoice()

  const handleSubmit = useCallback(
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
        await createAdhocInvoice({ apartmentId: apartmentId ?? '', payload })
        toast.success('Create Adhoc Invoice successfully')

        setTimeout(() => {
          navigate(ROUTES.normalInvoice.getPath(apartmentId ?? ''))
        }, 500)
      } catch (e) {
        toast.error(getErrorMessage(e))
      }
    },
    [apartmentId, createAdhocInvoice, navigate],
  )
  return (
    <PageSection>
      <PageHeader title="Invoice Create" description="Fill in the details to issue a new invoice." />
      <InvoiceCreateForm
        onSubmit={handleSubmit}
        buttonIcon={<Plus />}
        buttonLabel="Create a Task"
        isSubmitting={isPending}
      />
    </PageSection>
  )
}

export default InvoiceCreatePage
