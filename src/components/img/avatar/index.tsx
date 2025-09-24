import { cn } from '@/lib/utils';

export type AvatarProps = {
  className?: string;
  personName?: string;
};

export function Avatar({ className, personName, ...rest }: AvatarProps) {
  function getInitials() {
    if (!personName) return '';
    const splitted = personName.trim().split(' ');
    if (splitted.length === 1) return splitted[0].charAt(0).toUpperCase();
    return (splitted[0].charAt(0) + splitted[splitted.length - 1].charAt(0)).toUpperCase();
  }

  return (
    <div className={cn('h-7 w-7 rounded-full bg-primary border border-border flex items-center justify-center', className)} {...rest}>
      {!!personName && <span className='text-xs'>
        {getInitials()}
      </span>}
    </div>
  );
}
