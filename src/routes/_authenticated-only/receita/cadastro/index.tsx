import { Button, Form, Input, PageContainer, Textarea, Title } from '@/components'
import { saveRecipe, type Recipe } from '@/data/recipe'
import { useForm } from '@/hooks'
import { createFileRoute } from '@tanstack/react-router'
import { LuPlus } from 'react-icons/lu'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated-only/receita/cadastro/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { register, form, setForm, onSubmit, setErrorsFromApi, isLoading } = useForm<Recipe>({
    initialData: {
      ingredients: [{ description: '' }],
      steps: [{ description: '' }],
    },
    onSubmit: async (data) =>{
      const response = await saveRecipe(data)
      if (response.isError) {
        toast.error(response.message);
      }
    },
  })

  function addIngredient() {
    setForm((form) => ({ ...form, ingredients: [...(form.ingredients!), { description: '' }] }))
  }

  function addStep() {
    setForm((form) => ({ ...form, steps: [...(form.steps!), { description: '' }] }))
  }

  return (
    <PageContainer title='Cadastro de Receita' sub='Crie ou edite os dados da sua receita'>
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

            <Button variant='text' className='mx-auto' type='button' onClick={addIngredient}>
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

            <Button variant='text' className='mx-auto' type='button' onClick={addStep}>
              <LuPlus /> Passo
            </Button>
          </section>
        </div>

        <footer className='mt-10 flex items-center flex-row-reverse border-t border-border pt-5'>
          <Button type='submit' variant='primary' loading={isLoading}>
            Salvar Receita
          </Button>
        </footer>
      </Form>
    </PageContainer>
  )
}
