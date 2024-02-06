import { METADATA, VIEWPORT } from '@/configs'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styles/theme'
import '../styles/globals.css'
import { Navbar } from '@/components/elements'
import { Footer } from '@/components/elements/Footer'

export const metadata: Metadata = { ...METADATA, ...VIEWPORT }

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
