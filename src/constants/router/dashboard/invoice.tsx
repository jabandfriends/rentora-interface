import { MonthlyInvoiceCreate, MonthlyInvoiceDetail } from '@/components/pages/Invoice'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import InvoiceCreatePage from '@/pages/Invoice/InvoiceCreate'
import InvoiceDetailPage from '@/pages/Invoice/InvoiceDetail'
import MonthlyInvoicePage from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoice'
import NormalInvoicePage from '@/pages/Invoice/NormalInvoice'
import OverdueInvoicePage from '@/pages/Invoice/OverdueInvoice'
import ServiceInvoicePage from '@/pages/Invoice/ServiceInvoice'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const INVOICE_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.normalInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <NormalInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.monthlyInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <MonthlyInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.invoiceCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <InvoiceCreatePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.overdueInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <OverdueInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.serviceInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <ServiceInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.monthlyInvoiceCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <MonthlyInvoiceCreate />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.monthlyInvoiceDetail.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <MonthlyInvoiceDetail />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.invoiceDetail.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId="dashboard">
        <InvoiceDetailPage />
      </RequireApartmentWrapper>
    ),
  },
]
