'use client'

import { persistor, store } from '@/redux/store'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReduxProvider>
  )
}
