import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Package Detail',
  description: 'Upgrade your plan to access more features',
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
