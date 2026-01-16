import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://buttermychicken.com'),
  title: {
    default: 'Butter My Chicken | Tandoori Kitchen - Best Butter Chicken in Lafayette, CO',
    template: '%s | Butter My Chicken'
  },
  description: 'Experience the legendary butter chicken at Tandoori Kitchen in Lafayette, Colorado. Creamy, rich, and unforgettable - made with authentic spices and 30+ years of culinary heritage. Order online now!',
  keywords: [
    'butter chicken',
    'best butter chicken',
    'butter chicken Lafayette',
    'butter chicken Colorado',
    'tandoori kitchen',
    'indian food Lafayette',
    'indian restaurant Colorado',
    'authentic indian cuisine',
    'creamy butter chicken',
    'indian takeout',
    'butter chicken near me'
  ],
  authors: [{ name: 'Tandoori Kitchen' }],
  creator: 'Tandoori Kitchen',
  publisher: 'Tandoori Kitchen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buttermychicken.com',
    siteName: 'Butter My Chicken',
    title: 'Butter My Chicken | Best Butter Chicken in Lafayette, CO',
    description: 'Creamy, rich, and unforgettable butter chicken made with authentic spices. Order from Tandoori Kitchen today!',
    images: [
      {
        url: '/butter-chicken-1.png',
        width: 1200,
        height: 630,
        alt: 'Delicious Butter Chicken from Tandoori Kitchen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Butter My Chicken | Tandoori Kitchen',
    description: 'Experience the legendary butter chicken - creamy, rich, and unforgettable!',
    images: ['/butter-chicken-1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://buttermychicken.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Tandoori Kitchen',
              image: 'https://buttermychicken.com/butter-chicken-1.png',
              '@id': 'https://tandoorikitchenco.com',
              url: 'https://tandoorikitchenco.com',
              telephone: '',
              menu: 'https://tandoorikitchenco.com/order-online/butter-chicken/',
              servesCuisine: 'Indian',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '199 W. South Boulder Rd.',
                addressLocality: 'Lafayette',
                addressRegion: 'CO',
                postalCode: '80026',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 39.9936,
                longitude: -105.0897,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '11:00',
                  closes: '14:30',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '17:00',
                  closes: '21:30',
                },
              ],
              hasMenuItem: {
                '@type': 'MenuItem',
                name: 'Butter Chicken',
                description: 'Tender chicken simmered in a velvety tomato-cream sauce, infused with aromatic spices and finished with a touch of butter.',
                offers: {
                  '@type': 'Offer',
                  availability: 'https://schema.org/InStock',
                },
              },
            }),
          }}
        />
      </head>
      <body className="bg-charcoal text-cream antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
