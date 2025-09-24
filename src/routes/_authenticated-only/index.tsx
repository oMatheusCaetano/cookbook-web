import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated-only/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='p-5 md:p-10'>
      <div className='mx-auto md:w-max md:min-w-4xl'>
        <header>
          <h2 className='text-xl font-semibold'>Bem-vindo de volta!</h2>
          <p className='text-sm text-muted'>Por favor, insira suas credenciais para continuar</p>
        </header>
      </div>

      <main>
      </main>
    </div>
  )
}
