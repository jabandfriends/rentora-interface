import type { PropsWithChildren } from 'react'

const PageSection = ({ children }: PropsWithChildren) => {
  return <div className="desktop:px-0 container mx-auto flex flex-col gap-y-5 px-4 py-5">{children}</div>
}

export default PageSection
