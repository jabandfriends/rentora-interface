import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import Authentication from '@/pages/Authentication'
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
        path: '/dashboard/invoice',
        element: <NormalInvoicePage />,
      },
    ],
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
