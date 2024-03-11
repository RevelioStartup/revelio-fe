import React, { ReactNode } from 'react'

import { Footer } from '../Footer'
import Providers from './providers'
import { Navbar } from '../Navbar'
import { Toaster } from 'react-hot-toast'
interface MainLayout {
  children: ReactNode
}
export const MainLayout = ({ children }: MainLayout) => {
  return (
    <Providers>
      <Toaster />
      <main>
        <Navbar />
        <div className="mt-20 min-h-[90vh]">{children}</div>
        <Footer />
      </main>
    </Providers>
  )
}
