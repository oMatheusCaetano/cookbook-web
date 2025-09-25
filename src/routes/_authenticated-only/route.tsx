import { Avatar, Logo } from '@/components'
import { getUser } from '@/data/user'
import { useApp } from '@/hooks'
import { Storage } from '@/lib'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated-only')({
  component: RouteComponent,
    beforeLoad: async (props) => {
      const { app } = props.context

      //? If user is already in context, don't do anything
      if (app.user.id) {
        return
      }

      const userData = Storage.getAuthData()

      //? If user data in storage is empty or incomplete, redirect to login
      if (!userData?.user?.id || !userData?.token) {
        throw redirect({ to: '/entrar', search: { redirectTo: props.location.href }})
      }

      const response = await getUser(userData.user.id)

      if (response.isError) {
        throw redirect({ to: '/entrar' })
      }

      props.context.app.setUser(response.data)
    }
})

function RouteComponent() {
  const { user } = useApp()

  return <>
    <header className='bg-surface p-5 border-b border-border'>
      <header className='flex items-center justify-between gap-2'>
        <section className='flex items-center'>
          <Logo className='h-7' />
          <h1 className='ml-3'>
            Cookbook
          </h1>
        </section>

        <section className='flex items-center gap-4'>
          <Link to='/sair' className='inline-flex items-center gap-1 text-sm hover:underline'>
            Sair
          </Link>
          <Avatar personName={user.name} />
        </section>
      </header>
    </header>
    <Outlet />
  </>
}
