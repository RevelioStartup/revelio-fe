import { createContext, useContext, useState } from 'react'

type Venue = {
  id: number
  photos: string[]
  name: string
  address: string
  price: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  contact_name: string
  contact_phone_number: string
  event: string
}

type VenueContextProps = {
  venue: Venue
  setVenue: (venue: Venue) => void
}

export const VenueContext = createContext({} as VenueContextProps)

export const useVenueContext = () => useContext(VenueContext)

export const VenueContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [venue, setVenue] = useState<Venue>({
    id: 0,
    photos: [],
    name: '',
    address: '',
    price: 0,
    status: 'PENDING',
    contact_name: '',
    contact_phone_number: '',
    event: '',
  })

  const contextValue = {
    venue,
    setVenue,
  }

  return (
    <VenueContext.Provider value={contextValue}>
      {children}
    </VenueContext.Provider>
  )
}
