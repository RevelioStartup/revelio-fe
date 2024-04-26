import { Rundowns } from '@/types/rundown'
import { createContext, useContext, useState } from 'react'

type RundownContextProps = {
  rundown_data: Rundowns[]
  setRundowns: (rundown_data: Rundowns[]) => void
}

export const RundownContext = createContext({} as RundownContextProps)

export const useRundownContext = () => useContext(RundownContext)

export const RundownContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [rundown_data, setRundowns] = useState<Rundowns[]>([])

  const contextValue = {
    rundown_data,
    setRundowns,
  }

  return (
    <RundownContext.Provider value={contextValue}>{children}</RundownContext.Provider>
  )
}
