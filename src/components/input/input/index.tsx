import { InputContainer, type InputContainerProps } from '@/components/container/input-container';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: InputContainerProps['error'];
  label?: InputContainerProps['label'];
  contentClassName?: string;
  setValue?: (value: any) => void;
};

export function Input({ className, error, label, contentClassName, value, setValue, ...rest }: InputProps) {
  const enabled = !rest.disabled && !rest.readOnly;
  const [type, setType] = useState(rest.type || 'text');

  return (
    <InputContainer
      className={cn(className, '')}
      error={error}
      label={label}
    >
      <div
        className='w-full relative'
      >
        <input
          {...rest}
          type={type}
          value={value}
          onChange={(e) => setValue?.(e.target.value)}
          className={cn(
            contentClassName,
            'w-full h-9 px-2 transition',
            'rounded border border-border outline-none',
            enabled && 'focus:ring-2 focus:ring-primary/50 focus:border-primary',
            !enabled && 'cursor-not-allowed',
          )}
        />

        {enabled && (
          <span
            className='absolute transition right-2 top-1/2 -translate-y-1/2 cursor-pointer text-lg text-foreground/30 hover:text-foreground'
            onClick={() => setType(type === 'password' ? 'text' : 'password')}
          >
            {rest.type === 'password' && (
              type === 'password' ? <LuEyeClosed  /> : <LuEye />
            )}
          </span>
        )}
      </div>
    </InputContainer>
  );
}

