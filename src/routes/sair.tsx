import { Spinner, Title } from '@/components'
import { logout } from '@/data/auth';
import { Storage } from '@/lib';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/sair')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    Storage.removeAuthData()
    setTimeout(() => {
      navigate({ to: '/entrar', replace: true })
    }, 1000)
  }, []);

  return (
    <div className='h-[70vh] flex flex-col justify-center items-center gap-5'>
      <Spinner size={40} />
      <Title>Aguarde, saindo...</Title>
    </div>
  )
}
