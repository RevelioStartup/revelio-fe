import React, { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import Providers from './providers'

interface MainLayout {
  children: ReactNode
}
export const MainLayout = ({ children }: MainLayout) => {
  return (
    <Providers>
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </Providers>
  )
}
