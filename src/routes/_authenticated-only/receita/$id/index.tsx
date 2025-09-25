import { Avatar, Button, PageContainer, Title } from '@/components'
import { getRecipe } from '@/data/recipe'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { LuChevronLeft, LuPencil } from 'react-icons/lu'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { useApp } from '@/hooks'

export const Route = createFileRoute('/_authenticated-only/receita/$id/')({
  component: RouteComponent,
  loader: async (params) => {
    const response = await getRecipe(Number(params.params.id), { with: ['user', 'steps', 'ingredients'] })

    if (response.isError) {
      toast.error(response.message || 'Erro ao carregar receita')
      throw redirect({ to: '/' })
    }

    return response.data
  }
})

function RouteComponent() {
  const app = useApp()
  const recipe = Route.useLoaderData()

  return (
    <PageContainer
      title='Dados da Receita'
      actions={(
        <div className='flex items-center gap-4'>
          {recipe.user?.id === app.user?.id && (
            <Link to='/receita/cadastro/{-$id}' params={{ id: String(recipe.id) }}>
              <Button>
                <LuPencil />
              </Button>
            </Link>
          )}

          <Link to='/'>
            <Button className='flex items-center gap-2'>
              <LuChevronLeft />
            </Button>
          </Link>
        </div>
      )}
    >
      <div className='flex items-center gap-2 text-sm text-foreground/70'>
        <Avatar personName={recipe.user!.name} className='h-6 w-6' />
        <span>{recipe.user!.name}</span>
        <span>·</span>
        <span>{dayjs(recipe.created_at).format('DD, MMM [de] YYYY')}</span>
      </div>

      <div className='mt-7 mb-10'>
        <Title sub={recipe.description}>{recipe.name}</Title>
      </div>

      <div className='grid gap-5 md:grid-cols-12'>
        <section className='md:col-span-4'>
          <Title>Ingredientes</Title>

          <ul className='space-y-4 mt-5'>
            {recipe.ingredients?.map((ingredient, i) => (
              <li>
                {ingredient.description}
              </li>
            ))}
          </ul>
        </section>

        <section className='md:col-span-8 border-l border-border pl-5'>
          <Title>Passo a Passo</Title>

          <ul className='space-y-4 mt-5'>
            {recipe.steps?.map((step, i) => (
              <li key={i} className='flex gap-3 items-start'>
                <span className='mt-1 text-sm font-medium bg-border rounded-full h-5 w-5 flex items-center justify-center'>{i + 1}</span>
                <div>
                  {step.description}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageContainer>
  )
}
