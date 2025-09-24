import { Avatar, PageContainer } from '@/components'
import { paginateRecipe, type Recipe } from '@/data/recipe'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { BsPeople } from 'react-icons/bs'
import { LuClock } from 'react-icons/lu'

export const Route = createFileRoute('/_authenticated-only/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [recipes, setRecipes] = useState([] as Recipe[])
  const [meta, setMeta] = useState({} as any)
  const [loading, setLoading] = useState(false)

  async function load(page: number) {
    if (loading) return
    setLoading(true)

    const response = await paginateRecipe({ page, with: ['user'] })

    if (!response.isError) {
      setMeta({ ...response, data: undefined })
      setRecipes((recipes) => [...recipes, ...response.data])
    }

    setLoading(false)
  }

  const handleScroll = useCallback(() => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 200;

    if (bottom) {
      if (meta.current_page === meta.last_page) return;
      load(meta.current_page + 1);
    }
  }, [meta]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    load(1)
  }, [])

  return (
    <PageContainer title='Receitas' sub={meta.total ? `Total de ${meta.total} receitas encontradas` : undefined}>
      <ul>
        {recipes.map((recipe, i) => (
          <li key={i} className='p-4 border border-border rounded mb-5'>
            <h2 className='font-bold text-lg'>{recipe.name}</h2>
            <p className='text-sm text-foreground/70'>{recipe.description}</p>
            <div className='flex gap-4 mt-4'>
              <div className='flex items-center gap-2'>
                <LuClock className='text-foreground/70' /> <span className='text-sm text-foreground/70'>{recipe.prep_time}</span>
              </div>
              <div className='flex items-center gap-2'>
                <BsPeople className='text-foreground/70' /> <span className='text-sm text-foreground/70'>{recipe.servings}</span>
              </div>
            </div>
            {recipe.user && (
              <div className='mt-4 flex items-center gap-2 text-sm text-foreground/70'>
                <Avatar personName={recipe.user.name} className='h-6 w-6' />
                <span>{recipe.user.name}</span>
              </div>
            )}

          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
