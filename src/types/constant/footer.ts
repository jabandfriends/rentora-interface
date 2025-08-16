import type { ReactNode } from 'react'

import type { Maybe } from '@/types'

type FooterBase = {
  label: string
  to: Maybe<string>
  icon: ReactNode
}

export type FooterNavLink = Omit<FooterBase, 'icon'>

export type FooterSocialLink = FooterBase

export type FooterContactInfo = Omit<FooterBase, 'to'>
