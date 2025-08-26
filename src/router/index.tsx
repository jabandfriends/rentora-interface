import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ROUTES } from '@/constants'
import ApartmentCreatePage from '@/pages/ApartmentCreate'
import Authentication from '@/pages/Authentication'
import MonthlyInvoicePage from '@/pages/MonthlyInvoice'
import NormalInvoicePage from '@/pages/NormalInvoice'
import OverdueInvoicePage from '@/pages/OverdueInvoice'
import OverviewPage from '@/pages/Overview'

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
    path: '/setup',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        path: ROUTES.apartmentCreate.path,
        element: <ApartmentCreatePage />,
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
        path: ROUTES.overview.path,
        element: <OverviewPage />,
      },
      {
        path: ROUTES.normalInvoice.path,
        element: <NormalInvoicePage />,
      },
      {
        path: ROUTES.monthlyInvoice.path,
        element: <MonthlyInvoicePage />,
      },
      {
        path: ROUTES.overdueInvoice.path,
        element: <OverdueInvoicePage />,
      },
    ],
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
