import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Harmonica Voice',
  description: 'Exchanging visuals for meaningful communication',
  openGraph: {
    title: 'Harmonica Voice',
    description: 'A Sanctuary for your thoughts.',
    url: 'https://harmonica-voice.vercel.app',
    siteName: 'Harmonica Voice',
    images: [
      {
        url: '/mushroom-preview.jpg', // Points to the file you just committed
        width: 1200,
        height: 630,
        alt: 'Harmonica Voice Sanctuary',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmonica Voice',
    description: 'A Sanctuary for your thoughts.',
    images: ['/mushroom-preview.jpg'], // Ensures the mushroom appears on X
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, background: '#000' }}>
        {children}
      </body>
    </html>
  )
}
