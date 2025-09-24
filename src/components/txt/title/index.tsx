import { cn } from "@/lib/utils"

export type TitleProps = {
  className?: string
  children: React.ReactNode
  sub?: string
}

export function Title({ children, ...props }: TitleProps) {
  return (
    <header className={cn('space-y-2', props.className)}>
      <h2 className='text-xl font-semibold'>{children}</h2>
      <p className='text-sm text-muted'>
        {props.sub}
      </p>
    </header>
  )
}
