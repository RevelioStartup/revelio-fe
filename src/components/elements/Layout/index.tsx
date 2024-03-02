import React, { ReactNode } from 'react'

import { Footer } from '../Footer'
import Providers from './providers'
import { Navbar } from '../Navbar'

interface MainLayout {
  children: ReactNode
}
export const MainLayout = ({ children }: MainLayout) => {
  return (
    <Providers>
      <main>
        <Navbar />
        <div className="mt-20 min-h-[90vh]">{children}</div>
        <Footer />
      </main>
    </Providers>
  )
}
