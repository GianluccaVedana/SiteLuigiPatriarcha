import Header from './Header'
import Footer from './Footer'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  hideFooter?: boolean
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      <Header />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}
