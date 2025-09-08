import type { INestedObject } from '@/types/utils'

const toCamelCase: (input: string) => string = (input: string) => {
  return input.replace(/_([0-9a-z])/g, (_: string, letter: string) => letter.toUpperCase())
}

const camelizeKeys = (input: any): INestedObject => {
  if (typeof input !== 'object' || input === null) {
    // primitive types
    return input
  }
  if (Array.isArray(input)) {
    // array of objects
    return input.map((item: any) => camelizeKeys(item))
  }
  // convert
  return Object.entries(input).reduce((acc: INestedObject, [key, value]: [string, any]) => {
    const camelizedKey: string = toCamelCase(key)
    acc[camelizedKey] = camelizeKeys(value)
    return acc
  }, {} as INestedObject)
}

export { camelizeKeys }
