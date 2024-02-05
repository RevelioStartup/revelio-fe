import { METADATA, VIEWPORT } from '@/configs'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styles/theme'

export const metadata: Metadata = { ...METADATA, ...VIEWPORT }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children} </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
