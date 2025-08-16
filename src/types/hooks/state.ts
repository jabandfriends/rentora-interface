export interface IDeviceState {
  isMobile: boolean
  isDesktop: boolean
  isAndroid: boolean
  isIOS: boolean
  isPWA: boolean // is IOS standalone app
}

export type IUseDevice = IDeviceState
