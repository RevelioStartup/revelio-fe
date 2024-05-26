import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Check and logout your account here!',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
