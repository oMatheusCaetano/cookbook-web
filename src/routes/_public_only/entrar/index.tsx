import { AlertBanner, Button, Input, Logo, PageContainer } from '@/components'
import { login, type LoginData } from '@/data/auth'
import { useForm } from '@/hooks'
import { Storage } from '@/lib'
import { z } from 'zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_public_only/entrar/')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: 'Entrar | Cookbook' }] }),
  validateSearch: (search: Record<string, unknown>) => {
    return z.object({
      redirectTo: z.string().catch('/'),
    }).parse(search)}
})

function RouteComponent() {
  const { redirectTo } = Route.useSearch()
  const navigate = useNavigate()
  const { register, onSubmit, isLoading, error, setErrorsFromApi } = useForm<LoginData>({
    onSubmit: async (data) =>{
      const response = await login(data)
      if (setErrorsFromApi(response)) return
      Storage.setAuthData(response.data)
      navigate({ to: redirectTo as any, replace: true })
    },
  })

  return (
    <PageContainer className='flex items-center justify-center'>
      <main className='w-full max-w-sm px-5'>
        <Logo className='h-11' />

        <header className='text-center space-y-2 mb-10 mt-7 '>
          <h2 className='text-xl font-semibold'>Bem-vindo de volta!</h2>
          <p className='text-sm text-muted'>
            Por favor, insira suas credenciais para continuar.
          </p>
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
      </main>
    </PageContainer>
  )
}
