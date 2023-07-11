import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ThemeProvider } from "@/provider/theme-provider"
import Navbar from '@/components/navbar'

const opensans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OmnicTimes',
  description: 'OmnicTimes is a news site for latest Overwatch news and updates.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={opensans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
