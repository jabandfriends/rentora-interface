import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import InvoiceCreatePage from '@/pages/Invoice/InvoiceCreate'
import InvoiceDetailPage from '@/pages/Invoice/InvoiceDetail'
import MonthlyInvoicePage from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoice'
import MonthlyInvoiceCreate from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoiceCreate'
import MonthlyInvoiceDetail from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoiceDetail'
import NormalInvoicePage from '@/pages/Invoice/NormalInvoice'
import OverdueInvoicePage from '@/pages/Invoice/OverdueInvoice'
import ServiceInvoicePage from '@/pages/Invoice/ServiceInvoice'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const INVOICE_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.normalInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <NormalInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.monthlyInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <MonthlyInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.invoiceCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <InvoiceCreatePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.overdueInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <OverdueInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.serviceInvoice.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <ServiceInvoicePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.monthlyInvoiceCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <MonthlyInvoiceCreate />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.monthlyInvoiceDetail.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <MonthlyInvoiceDetail />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.invoiceDetail.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <InvoiceDetailPage />
      </RequireApartmentWrapper>
    ),
  },
]
