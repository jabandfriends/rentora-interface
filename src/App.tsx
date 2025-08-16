import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Router from './router'

const queryClient: QueryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App
