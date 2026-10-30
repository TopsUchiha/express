import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export function Logo({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const { name, logo, logoMark } = siteConfig.company
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-3', className)}
      aria-label={`${name} home`}
    >
      {logo ? (
        <Image src={logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-sm text-sm font-black tracking-tight',
            tone === 'light' ? 'bg-white text-brand' : 'bg-brand text-white',
          )}
        >
          {logoMark}
        </span>
      )}
      <span
        className={cn(
          'text-base font-extrabold uppercase leading-none tracking-wide',
          tone === 'light' ? 'text-white' : 'text-navy',
        )}
      >
        {name}
      </span>
    </Link>
  )
}
