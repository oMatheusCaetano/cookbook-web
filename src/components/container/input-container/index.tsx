import { Error } from "@/components/txt/error"
import { Label } from "@/components/txt/label"
import { tw } from "@matheuscaetano/helprs"

export type InputContainerProps = {
  error?: string
  label?: string
  className?: string
  children: React.ReactNode
}

export function InputContainer({ children, ...props }: InputContainerProps) {
  return (
    <div {...props} className={tw(props.className)}>
      {!!props.label && <Label>{props.label}</Label>}
      {children}
      {!!props.error && <Error>{props.error}</Error>}
    </div>
  )
}
