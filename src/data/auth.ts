import { post } from './gateway/api'
import type { User } from './user'

export type LoginData = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: User
}

export async function login(data: LoginData) {
  return post<LoginResponse>('auth/login', data)
}
