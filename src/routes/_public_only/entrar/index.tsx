import { AlertBanner, Button, Input, Logo, Title } from '@/components'
import { login, type LoginData } from '@/data/auth'
import { useForm } from '@/hooks'
import { Storage } from '@/lib'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_public_only/entrar/')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: 'Entrar | Cookbook' }] }),
})

function RouteComponent() {
  const { register, onSubmit, isLoading, error, setErrorsFromApi } = useForm<LoginData>({
    onSubmit: async (data) =>{
      const response = await login(data)
      if (setErrorsFromApi(response)) return
      Storage.setAuthData(response.data)
      window.location.replace('/')
    },
  })

  return (
    <div className='flex items-center justify-center min-h-dvh'>
      <main className='w-full max-w-sm px-5'>
        <Logo className='h-11' />

        <header className='text-center space-y-2 mb-10 mt-7 '>
          <Title sub='Por favor, insira suas credenciais para continuar.'>
            Bem-vindo de volta!
          </Title>
        </header>

        <form className='space-y-4' onSubmit={onSubmit}>
          {!!error && <AlertBanner variant='error' title={error} />}

          <Input label='E-mail' {...register('email')} />
          <Input label='Senha' type='password' {...register('password')} />

          <Button
            variant='primary'
            className='w-full mt-7'
            loading={isLoading}
          >
            Entrar
          </Button>
        </form>

        <p className='text-sm text-center mt-10'>
          Não tem uma conta? <Link to='/registrar' className='font-semibold'>Registre-se</Link>
        </p>
      </main>
    </div>
  )
}
