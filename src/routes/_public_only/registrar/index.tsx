import { AlertBanner, Button, Input, Logo } from '@/components'
import { createUser, type CreateUserData } from '@/data/user'
import { useForm } from '@/hooks'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_public_only/registrar/')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: 'Entrar | Cookbook' }] }),
})

function RouteComponent() {
  const navigate = useNavigate()
  const { register, onSubmit, isLoading, error, setErrorsFromApi } = useForm<CreateUserData>({
    onSubmit: async (data) =>{
      const response = await createUser(data)
      if (setErrorsFromApi(response)) return
      navigate({ to: '/' })
    },
  })

  return (
    <div className='flex items-center justify-center min-h-dvh'>
      <main className='w-full max-w-sm px-5'>
        <Logo className='h-11' />

        <header className='text-center space-y-2 mb-10 mt-7 '>
          <h2 className='text-xl font-semibold'>Criar conta</h2>
          <p className='text-sm text-muted'>
            Informe os dados para criar sua conta e começar a usar o Cookbook.
          </p>
        </header>

        <form className='space-y-4' onSubmit={onSubmit}>
          {!!error && <AlertBanner variant='error' title={error} />}

          <Input label='Nome' {...register('name')} />
          <Input label='E-mail' {...register('email')} />
          <Input label='Senha' type='password' {...register('password')} />
          <Input label='Repetir Senha' type='password' {...register('password_confirmation')} />

          <Button
            variant='primary'
            className='w-full mt-7'
            loading={isLoading}
          >
            Criar conta
          </Button>
        </form>

        <p className='text-sm text-center mt-4'>
          Já possui uma conta? <Link to='/entrar' className='font-semibold'>Entrar</Link>
        </p>
      </main>
    </div>
  )
}
