import { cn } from "@/lib/utils"

export type PageContainerProps = {
  className?: string
  children: React.ReactNode
}

export function PageContainer({ children, ...props }: PageContainerProps) {
  return <div {...props} className={cn(props.className, "min-h-dvh")}>{children}</div>
}
