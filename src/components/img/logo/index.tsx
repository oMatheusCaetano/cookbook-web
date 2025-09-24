import { cn } from '@/lib/utils';

export type LogoProps = {
  className?: string;
};

export function Logo({ className, ...rest }: LogoProps) {
  return <img {...rest} src='/logo192.png' alt='Logo' className={cn(className, 'mx-auto')} />
}
