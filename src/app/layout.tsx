import '../styles/globals.css'
import { METADATA, VIEWPORT } from '@/configs'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styles/theme'
import { MainLayout } from '@/components/elements/Layout'
import Metrics from './metrics'
import React from 'react';

export const metadata: Metadata = { ...METADATA, ...VIEWPORT }

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Metrics />
          <ThemeProvider theme={theme}>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
