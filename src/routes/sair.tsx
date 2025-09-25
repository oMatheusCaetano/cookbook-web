import { Spinner, Title } from '@/components'
import { logout } from '@/data/auth';
import { Storage } from '@/lib';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/sair')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: 'Saindo... | Cookbook' }] }),
})

function RouteComponent() {
  useEffect(() => {
    logout()
    Storage.removeAuthData()
    setTimeout(() => {
      window.location.replace('/entrar')
    }, 1000)
  }, []);

  return (
    <div className='h-[70vh] flex flex-col justify-center items-center gap-5'>
      <Spinner size={40} />
      <Title>Aguarde, saindo...</Title>
    </div>
  )
}
