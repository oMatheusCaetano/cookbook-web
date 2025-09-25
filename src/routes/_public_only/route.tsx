import { Storage } from '@/lib'
import { createFileRoute,  Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public_only')({
  component: RouteComponent,
    beforeLoad: async () => {
      if (Storage.getAuthData()) {
        throw redirect({ to: '/' } )
      }
    }
})

function RouteComponent() {
  return <Outlet />
}
