import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosResponse,
  type AxiosStatic,
  type InternalAxiosRequestConfig,
} from 'axios'

import type { Maybe } from '@/types'
import { camelizeKeys, parseStorageKey } from '@/utilities'

const { create }: AxiosStatic = axios
export class RentoraApiBaseClient {
  readonly axiosInstance: AxiosInstance
  readonly axiosWithAuthInstance: AxiosInstance // with auth

  constructor(baseURL: string, headers?: AxiosHeaders) {
    this.axiosInstance = create({
      baseURL,
      headers,
    })

    this.axiosWithAuthInstance = axios.create({
      baseURL,
      headers,
    })
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Do something before request is sent

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any, any>) => {
        // Do something before request is sent
        //  e.g. add authorization header
        return camelizeKeys(response) as AxiosResponse<any, any>
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
    this.axiosWithAuthInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const auth: Maybe<string> = localStorage.getItem(parseStorageKey('auth'))

        if (auth) {
          const { accessToken }: { accessToken: string } = JSON.parse(auth)
          config.headers.set('Rentora-Auth-Token', accessToken)
        }

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
    this.axiosWithAuthInstance.interceptors.response.use(
      (response: AxiosResponse<any, any>) => {
        return camelizeKeys(response) as AxiosResponse<any, any>
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
  }
}
