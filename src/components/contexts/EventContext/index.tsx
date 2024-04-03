import React, { createContext, useContext, useState } from 'react'

type EventPageProps = {
  open: boolean
  setOpen: (open: boolean) => void
  page: 'planner' | 'purpose'
  setEventPage: (page: EventPageProps['page']) => void
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
}

export const EventContext = createContext({} as EventPageProps)

export const useEventContext = () => useContext(EventContext)

export const EventContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [page, setPage] = useState<EventPageProps['page']>('planner')

  const setEventPage = (page: EventPageProps['page']) => {
    setPage(page)
  }

  const [open, setOpen] = React.useState(false)
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const contextValue = {
    open,
    setOpen,
    page,
    setEventPage,
    handleClose,
  }

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  )
}
