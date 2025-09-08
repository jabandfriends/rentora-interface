import type { PropsWithChildren } from 'react'

export const OutletWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex min-h-[calc(100dvh-var(--header-height))] overflow-y-auto">{children}</div>
}
