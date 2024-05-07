'use client'
import { TaskContextProvider } from '@/components/contexts/TaskContext'
import { RundownContextProvider } from '@/components/contexts/RundownContext'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TaskContextProvider>
      <RundownContextProvider>
        <div className="mx-8 my-20">{children}</div>
      </RundownContextProvider>
    </TaskContextProvider>
  )
}
