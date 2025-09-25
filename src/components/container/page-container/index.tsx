import { Title } from "@/components/txt/title"
import { cn } from "@/lib/utils"

export type PageContainerProps = {
  className?: string
  children: React.ReactNode
  title?: string
  sub?: string
  actions?: React.ReactNode
}

export function PageContainer({ children, title, sub, ...props }: PageContainerProps) {
  return (
    <div {...props} className={cn(props.className, 'p-5 py-10 md:max-w-4xl space-y-10 mx-auto')}>
      <header className="flex items-center justify-between">
        {(!!title || !!sub) && <Title sub={sub}>{title}</Title>}
        {props.actions && <div className="flex items-center justify-center gap-4">{props.actions}</div>}
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}
