import { get } from "./gateway/api"

export type User = {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}


export async function getUser(id: number) {
  return get<User>(`user/${id}`)
}
