import { ReactNode } from 'react'
import clsx from 'clsx'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={clsx('py-20 px-4', className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

