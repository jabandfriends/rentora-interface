import { atom } from 'jotai'

import type { IDeviceState } from '@/types'

const DEFAULT_DEVICE_STATE: IDeviceState = {
  isMobile: false,
  isDesktop: true,
  isAndroid: false,
  isIOS: false,
  isPWA: false,
}

export const deviceAtom: ReturnType<typeof atom<IDeviceState>> = atom<IDeviceState>(DEFAULT_DEVICE_STATE)
