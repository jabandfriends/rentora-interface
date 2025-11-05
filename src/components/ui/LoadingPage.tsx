import { Spinner } from '@/components/common'
import { PageSection } from '@/components/layout'

const LoadingPage = () => {
  return (
    <PageSection className="flex items-center justify-center">
      <Spinner />
    </PageSection>
  )
}

export default LoadingPage
