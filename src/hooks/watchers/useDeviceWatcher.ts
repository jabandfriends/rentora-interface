import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { deviceAtom } from '@/atoms'
import { BASE_MEDIA_QUERY_STATE, USER_AGENT_REGEXP } from '@/constants'
import type { IDeviceState, SetAtom } from '@/types'

const getMediaQueryState = (width: number): Partial<IDeviceState> => {
  // DESKTOP
  if (width >= 1280) {
    return { ...BASE_MEDIA_QUERY_STATE, isDesktop: true }
  }

  // MOBILE
  return { ...BASE_MEDIA_QUERY_STATE, isMobile: true }
}

export const useDeviceWatcher = () => {
  const setDevice: SetAtom<IDeviceState> = useSetAtom(deviceAtom)

  useEffect(() => {
    const handleResize: () => void = (): void => {
      const width: number = window.innerWidth
      setDevice((prev: IDeviceState) => ({
        ...prev,
        ...getMediaQueryState(width),
      }))
    }

    // initial once
    handleResize()

    // wait for the page to load
    setTimeout(() => {
      window.addEventListener('resize', handleResize)
    }, 300)

    return () => window.removeEventListener('resize', handleResize)
  }, [setDevice])

  useEffect(() => {
    setDevice((prev: IDeviceState) => ({
      ...prev,
      isPWA: 'standalone' in window.navigator && !!window.navigator['standalone'],
      isIOS: USER_AGENT_REGEXP.MOBILE_IOS.test(window.navigator.userAgent),
      isAndroid: USER_AGENT_REGEXP.MOBILE_ANDROID.test(window.navigator.userAgent),
    }))
  }, [setDevice])
}
