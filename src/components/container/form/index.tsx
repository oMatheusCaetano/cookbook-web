import { cn } from "@/lib/utils"

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>

export function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className={cn(props.className, 'space-y-4')}>
      {children}
    </form>
  )
}
