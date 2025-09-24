import { Button, Form, Input, PageContainer, Textarea, Title } from '@/components'
import { deleteRecipe, getRecipe, saveRecipe, type Recipe } from '@/data/recipe'
import { useForm } from '@/hooks'
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { LuChevronLeft, LuPlus } from 'react-icons/lu'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

export const Route = createFileRoute('/_authenticated-only/receita/cadastro/{-$id}/')({
  component: RouteComponent,
  loader: async (params) => {
    if (!params.params.id) return null

    const response = await getRecipe(Number(params.params.id), { with: ['user', 'steps', 'ingredients'] })

    if (response.isError) {
      toast.error(response.message || 'Erro ao carregar receita')
      throw redirect({ to: '/' })
    }

    return response.data
  }
})

function RouteComponent() {
  const navigate = useNavigate()

  const { register, form, setForm, onSubmit, setErrorsFromApi, isLoading } = useForm<Recipe>({
    initialData: Route.useLoaderData() ?? {
      ingredients: [{ description: '' }],
      steps: [{ description: '' }],
    },
    onSubmit: async (data) =>{
      const response = await saveRecipe(data)
      const error = setErrorsFromApi(response)

      if (error) {
        error.message && toast.error(error.message);
        return
      }

      toast.success('Receita salva com sucesso!')
      navigate({ to: '/' })
    },
  })

  function addIngredient() {
    setForm((form) => ({ ...form, ingredients: [...(form.ingredients!), { description: '' }] }))
  }

  function addStep() {
    setForm((form) => ({ ...form, steps: [...(form.steps!), { description: '' }] }))
  }

  async function handleDelete() {
    const confirm = await Swal.fire({
      title: "Excluir Receita?",
      text: "Você não poderá reverter isso!",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) return

    const response = await deleteRecipe(form.id!)
    if (response.isError) {
      toast.error(response.message || 'Erro ao excluir receita')
      return
    }

    toast.success('Receita excluída com sucesso!')
    navigate({ to: '/' })

  }

  return (
    <PageContainer
      title='Cadastro de Receita'
      sub='Crie ou edite os dados da sua receita'
      actions={(
        <Link to='/'>
          <Button className='flex items-center gap-2'>
            <LuChevronLeft />
          </Button>
        </Link>
      )}
    >
      <Form onSubmit={onSubmit}>
        <Input
          label='Nome da Receita'
          placeholder='Bolo de Cenoura'
          {...register('name')}
        />

        <Textarea
          label='Descrição da receita'
          placeholder='Fale sobre a sua receita'
          {...register('description')}
        />

        <Input
          label='Serve'
          placeholder='2 Pessoas'
          {...register('servings')}
        />

        <Input
          label='Tempo de Preparo'
          placeholder='30 minutos'
          {...register('prep_time')}
        />

        <div className='grid gap-5 md:grid-cols-12 mt-12'>
          <section className='md:col-span-4'>
            <Title>Ingredientes</Title>

            <ul className='space-y-4 mb-2'>
              {form.ingredients?.map((_, i) => (
                <li key={i}>
                  <Input
                    placeholder='250g farinha'
                    {...register(`ingredients.${i}.description`)}
                  />
                </li>
              ))}
            </ul>

            <Button className='mx-auto' variant='text' type='button' onClick={addIngredient}>
              <LuPlus /> Ingrediente
            </Button>
          </section>

          <section className='md:col-span-8'>
            <Title>Passo a Passo</Title>

            <ul className='space-y-4 mb-2'>
              {form.steps?.map((_, i) => (
                <li key={i}>
                  <Textarea
                    placeholder='Misture farinha com água até formarem uma massa espessa'
                    {...register(`steps.${i}.description`)}
                  />
                </li>
              ))}
            </ul>

            <Button className='mx-auto' variant='text' type='button' onClick={addStep}>
              <LuPlus /> Passo
            </Button>
          </section>
        </div>

        <footer className='mt-10 flex items-center flex-row-reverse border-t border-border pt-5 gap-4'>
          <Button type='submit' variant='primary' loading={isLoading}>
            Salvar Receita
          </Button>

          {!!form.id && <Button type='button'  loading={isLoading} onClick={handleDelete}>
            Excluir
          </Button>}
        </footer>
      </Form>
    </PageContainer>
  )
}
