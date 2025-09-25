import { get, post } from "./gateway/api"

export type User = {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export type CreateUserData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}


export async function getUser(id: number) {
  return get<User>(`user/${id}`)
}

export async function createUser(data: CreateUserData) {
  return post<User>('user', data)
}
