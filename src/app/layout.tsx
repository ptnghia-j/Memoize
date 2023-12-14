import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ToasterProvider } from '@/components/providers/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memoize',
  description: 'Flashcards for memorizing & Games for fun',
  icons: {
    icon: [
      {
        media:"(prefers-color-scheme: dark)",
        url: "/logo_dark.png",
        href: "/logo_dark.png",
      },
      {
        media:"(prefers-color-scheme: light)",
        url: "/logo_light.png",
        href: "/logo_light.png",
      }
    ]
  }
}

export default function RootLayout({
  children,
}:{
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased min-h-screen pt-16") }>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey='memoize-theme'
        >
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
