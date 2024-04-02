'use client'
import { TaskContextProvider } from '@/components/contexts/TaskContext'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TaskContextProvider>
      <div className="mx-8 my-20">{children}</div>
    </TaskContextProvider>
  )
}
