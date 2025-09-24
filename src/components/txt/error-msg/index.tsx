import { cn } from "@/lib/utils"

export type ErrorProps = {
  className?: string
  children: React.ReactNode
}

export function ErrorMsg({ children, ...props }: ErrorProps) {
  return <span className={cn(props.className, "text-sm text-destructive")}>{children}</span>
}
