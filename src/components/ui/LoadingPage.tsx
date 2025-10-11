import { Spinner } from '@/components/common'
import { PageSection } from '@/components/layout'

const LoadingPage = () => {
  return (
    <PageSection className="bg-theme-light-50 flex h-full items-center justify-center">
      <Spinner />
    </PageSection>
  )
}

export default LoadingPage
