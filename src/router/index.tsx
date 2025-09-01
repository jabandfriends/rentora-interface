import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ROUTES } from '@/constants'
import Authentication from '@/pages/Authentication'
import MaintenancePage from '@/pages/Maintenance'
import MonthlyInvoicePage from '@/pages/MonthlyInvoice'
import NormalInvoicePage from '@/pages/NormalInvoice'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        element: <Authentication />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        path: ROUTES.normalInvoice.path,
        element: <NormalInvoicePage />,
      },
      {
        path: ROUTES.monthlyInvoice.path,
        element: <MonthlyInvoicePage />,
      },
      {
        path: ROUTES.maintenance.path,
        element: <MaintenancePage />,
      },
    ],
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
