export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-8 my-20">{children}</div>
}
