export const USER_AGENT_REGEXP: Record<'LINUX' | 'MAC_OS' | 'WINDOWS' | 'MOBILE_IOS' | 'MOBILE_ANDROID', RegExp> = {
  LINUX: /(Linux)|(X11)/,
  MAC_OS: /(Mac_PowerPC)|(Macintosh)/,
  WINDOWS: /(Windows)/,
  MOBILE_IOS: /iPhone|iPad|iPod|iOS/,
  MOBILE_ANDROID: /Android/,
}
