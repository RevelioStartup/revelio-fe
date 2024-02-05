import type { Metadata } from "next";
import type { Viewport } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from "@/styles/theme";
import "../styles/globals.css";
import { METADATA, VIEWPORT } from "@/configs";

export const metadata: Metadata = METADATA;

export const viewport: Viewport = VIEWPORT;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>        
        <ThemeProvider theme={theme}>
          <body>{children}</body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
