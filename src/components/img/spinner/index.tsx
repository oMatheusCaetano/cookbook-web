import { cn } from '@/lib/utils';
import { CgSpinnerAlt } from 'react-icons/cg';

export type SpinnerProps = {
  className?: string;
  size?: number;
};

export function Spinner({ className, size, ...rest }: SpinnerProps) {
  return (
    <div className={cn(className, '')} {...rest}>
      <CgSpinnerAlt className='animate-spin' size={size} />
    </div>
  );
}
