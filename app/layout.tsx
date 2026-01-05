import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// THE "DONE PRODUCT" PACKAGE: This creates the link preview
export const metadata = {
  title: 'Harmonica',
  description: 'A Gift of Stashed Cognition',
  openGraph: {
    title: 'Harmonica',
    description: 'You have received a secret visual message.',
    url: 'https://harmonica-voice.vercel.app',
    siteName: 'Harmonica',
    // This image will show up when you share the link on WhatsApp/iMessage
    images: [
      {
        url: 'https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png',
        width: 1200,
        height: 630,
        alt: 'Harmonica Golden Vault',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmonica',
    description: 'A Gift of Stashed Cognition',
    images: ['https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, background: '#000' }}>
        {children}
      </body>
    </html>
  );
}
