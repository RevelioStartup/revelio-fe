import { Steps } from '@/types/taskStep'
import { createContext, useContext, useState } from 'react'

type TaskContextProps = {
  steps: Steps[]
  setSteps: (steps: Steps[]) => void
}

export const TaskContext = createContext({} as TaskContextProps)

export const useTaskContext = () => useContext(TaskContext)

export const TaskContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [steps, setSteps] = useState<Steps[]>([])

  const contextValue = {
    steps,
    setSteps,
  }

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  )
}
