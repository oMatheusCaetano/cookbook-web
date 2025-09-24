import { LuCircleAlert } from "react-icons/lu"
import { TiWarningOutline } from 'react-icons/ti'
import { HiOutlineInformationCircle, HiOutlineCheckCircle } from 'react-icons/hi'
import { BsQuestionCircle } from 'react-icons/bs'

export type AlertBannerProps = {
  title: string;
  variant?: 'error' | 'warning' | 'info' | 'success' | 'question'
}

export function AlertBanner({ title, variant }: AlertBannerProps) {
  return (
    <div className="rounded-md border border-border px-4 py-3">
      <div className="flex items-center gap-3">
        {
          variant === 'warning' ? <TiWarningOutline
            className="mt-0.5 shrink-0 text-warning"
            size={16}
            aria-hidden="true"
          /> :
          variant === 'error' ? <LuCircleAlert
            className="mt-0.5 shrink-0 text-destructive"
            size={16}
            aria-hidden="true"
          /> :
          variant === 'info' ? <HiOutlineInformationCircle
            className="mt-0.5 shrink-0 text-info"
            size={16}
            aria-hidden="true"
          /> :
          variant === 'success' ? <HiOutlineCheckCircle
            className="mt-0.5 shrink-0 text-success"
            size={16}
            aria-hidden="true"
          /> :
          variant === 'question' ? <BsQuestionCircle
            className="mt-0.5 shrink-0 text-muted"
            size={16}
            aria-hidden="true"
          /> :
          <></>
        }
        <div className="grow space-y-1">
          <p className="text-sm font-medium">{title}</p>
        </div>
      </div>
    </div>
  )
}
