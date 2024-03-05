import { createContext, useContext, useState } from 'react'

type EventPageProps = {
  page: 'name' | 'date' | 'budget' | 'purpose'
  setEventPage: (page: EventPageProps['page']) => void
}

export const EventContext = createContext({} as EventPageProps)

export const useEventContext = () => useContext(EventContext)

export const EventContextProvider = ({
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