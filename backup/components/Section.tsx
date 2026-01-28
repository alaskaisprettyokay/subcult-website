import { ReactNode } from 'react'
import clsx from 'clsx'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id} 
      className={clsx('py-12 md:py-20 px-4 bg-[#0a0a0a]', className)}
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

