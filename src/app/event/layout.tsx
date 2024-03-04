'use client'
import { createContext, useContext, useState } from 'react'

type EventPageProps = {
  page: 'name' | 'date' | 'budget' | 'purpose'
  setEventPage: (page: EventPageProps['page']) => void
}

const EventContext = createContext({} as EventPageProps)

export const useEventContext = () => useContext(EventContext)

const EventContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [page, setPage] = useState<EventPageProps['page']>('name')

  const setEventPage = (page: EventPageProps['page']) => {
    setPage(page)
  }

  const contextValue = {
    page,
    setEventPage,
  }

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  )
}
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <EventContextProvider>
      <div className="flex flex-col min-h-[90vh] justify-center">
        <div className="w-full flex flex-col justify-center h-full items-center ">
          {children}
        </div>
      </div>
    </EventContextProvider>
  )
}
