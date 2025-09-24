import { InputContainer, type InputContainerProps } from '@/components/container/input-container';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: InputContainerProps['error'];
  label?: InputContainerProps['label'];
  contentClassName?: string;
  setValue?: (value: any) => void;
};

export function Textarea({ className, error, label, contentClassName, value, setValue, ...rest }: TextareaProps) {
  const enabled = !rest.disabled && !rest.readOnly;

  return (
    <InputContainer
      className={cn(className, '')}
      error={error}
      label={label}
    >
      <textarea
        {...rest}
        value={value}
        onChange={(e) => setValue?.(e.target.value)}
        className={cn(
          contentClassName,
          'w-full px-2 transition',
          'rounded border border-border outline-none',
          enabled && 'focus:ring-2 focus:ring-primary/50 focus:border-primary',
          !enabled && 'cursor-not-allowed',
        )}
      />
    </InputContainer>
  );
}

