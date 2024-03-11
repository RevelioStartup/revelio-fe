'use client'

import { EventContextProvider } from '@/components/contexts/EventContext'

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
