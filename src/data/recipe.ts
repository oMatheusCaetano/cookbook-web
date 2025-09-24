import { getPaginated, post, put } from "./gateway/api"
import type { User } from "./user"

export type Recipe = {
  id?: number
  name: string
  description: string
  prep_time: string
  servings: string
  created_at: string
  updated_at: string

  user?: User
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
}

export type RecipeIngredient = {
  id?: number
  id_recipe?: number
  description: string
}

export type RecipeStep = {
  id?: number
  id_recipe?: number
  description: string
}

export async function paginateRecipe(props: { page?: number; per_page?: number, with?: ('user' | 'ingredients' | 'steps')[] }) {
  return getPaginated<Recipe>('recipe', props);
}

export async function saveRecipe(data: Partial<Recipe>) {
  return !!data.id ? put<Recipe>(`recipe/${data.id}`, data) : post<Recipe>('recipe', data)
}
