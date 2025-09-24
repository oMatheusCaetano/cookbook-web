import { cn } from '@/lib/utils';
import { CgSpinner } from 'react-icons/cg';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'destructive' | 'outline-destructive' | 'text';
};

export function Button({ children, className, loading, variant, ...rest }: ButtonProps) {
  const enabled = !loading && !rest.disabled;

  return (
    <button
      {...rest}
      className={cn(className,
        'h-9 border border-border rounded px-5 font-medium tracking-wide transition outline-none',
        'flex items-center justify-center gap-2 relative',
        enabled && 'cursor-pointer',
        !enabled && 'cursor-not-allowed opacity-50',
        enabled && !variant && 'hover:bg-border active:bg-border/70 focus:ring-2 focus:ring-border/50',

        variant === 'primary' && 'text-primary-foreground bg-primary border-primary',
        enabled && variant === 'primary' && 'hover:bg-primary/80 hover:border-primary/20 active:bg-primary/70 focus:ring-2 focus:ring-primary/50',

        variant === 'destructive' && 'text-destructive-foreground bg-destructive border-destructive',
        enabled && variant === 'destructive' && 'hover:bg-destructive/80 hover:border-destructive/20 active:bg-destructive/70 focus:ring-2 focus:ring-destructive/50',

        variant === 'outline-destructive' && 'text-destructive bg-transparent border border-destructive',
        enabled && variant === 'outline-destructive' && 'hover:text-foreground hover:bg-destructive/80 hover:border-destructive/20 active:bg-destructive/70 focus:ring-2 focus:ring-destructive/50',

        variant === 'text' && 'text-primary-foreground bg-transparent border-transparent',
        enabled && variant === 'text' && 'hover:bg-border/80 hover:border-border/20 active:bg-border/70 focus:ring-2 focus:ring-border/50',
      )}
    >
      <span className={cn('flex items-center gap-2', loading && 'invisible')}>
        {children}
      </span>
      {loading && <CgSpinner className='animate-spin absolute text-lg' />}
    </button>
  );
}
