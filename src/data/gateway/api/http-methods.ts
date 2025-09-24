import { Http } from '@/lib'
import * as types from './types'
import { api } from './config'

export async function get<T>(endpoint: string, queryString?: Record<string, any>): Promise<types.RequestError | types.RequestResponse<T>> {
  const query = Http.toQueryString(queryString)
  const url = query ? `${endpoint}?${query}` : endpoint
  return makeRequest<T>(api.get(url))
}

export async function post<T>(endpoint: string, payload: any): Promise<types.RequestError | types.RequestResponse<T>> {
  return makeRequest<T>(api.post(endpoint, payload))
}

export async function put<T>(endpoint: string, payload: any): Promise<types.RequestError | types.RequestResponse<T>> {
  return makeRequest<T>(api.put(endpoint, payload))
}

export async function del<T>(endpoint: string, queryString: Record<string, any>): Promise<types.RequestError | types.RequestResponse<T>> {
  const query = Http.toQueryString(queryString)
  const url = query ? `${endpoint}?${query}` : endpoint
  return makeRequest<T>(api.delete(url))
}

async function makeRequest<T>(caller: Promise<any>): Promise<types.RequestError | types.RequestResponse<T>> {
  try {
    const { data } = await caller
    return { data: data as T, isError: false }
  } catch (err: any) {
    console.error('ERRO NA REQUISIÇÃO PARA A API:', err)

    return {
      data: err?.response?.data,
      message: err?.response?.data?.message || err?.response?.message || err?.message || 'Falha ao processar requisição',
      isError: true
    }
  }
}
