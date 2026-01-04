import './globals.css'

export const metadata = {
  title: 'Harmonica Sanctuary',
  description: 'A Sanctuary for Stashed Cognition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
