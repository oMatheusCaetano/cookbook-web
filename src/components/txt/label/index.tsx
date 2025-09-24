import { cn } from "@/lib/utils"

export type LabelProps = {
  className?: string
  children: React.ReactNode
}

export function Label({ children, ...props }: LabelProps) {
  return <label {...props} className={cn(props.className)}>{children}</label>
}
