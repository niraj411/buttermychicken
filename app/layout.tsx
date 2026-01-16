import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Butter Chicken | Tandoori Kitchen',
  description: 'Experience our legendary butter chicken - creamy, rich, and unforgettable. A signature dish by Tandoori Kitchen.',
  keywords: ['butter chicken', 'tandoori', 'indian food', 'tandoori kitchen', 'indian restaurant'],
  openGraph: {
    title: 'Butter Chicken | Tandoori Kitchen',
    description: 'Experience our legendary butter chicken - creamy, rich, and unforgettable.',
    type: 'website',
    url: 'https://buttermychicken.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-charcoal text-cream antialiased">
        {children}
      </body>
    </html>
  )
}
