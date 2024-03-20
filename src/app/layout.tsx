import { METADATA, VIEWPORT } from '@/configs'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styles/theme'
import '../styles/globals.css'
import { MainLayout } from '@/components/elements/Layout'

export const metadata: Metadata = { ...METADATA, ...VIEWPORT }

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-WY3830WP4B" />
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
