import { cn } from "@/lib/utils"

export type ErrorProps = {
  className?: string
  children: React.ReactNode
}

export function Error({ children, ...props }: ErrorProps) {
  return <span className={cn(props.className, "text-sm text-destructive")}>{children}</span>
}
