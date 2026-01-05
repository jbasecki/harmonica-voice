import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harmonica Voice | A Patented Gift",
  description: "Experience a cognitive stash of thought within a cinematic piano sanctuary.",
  openGraph: {
    title: "Harmonica Voice",
    description: "Someone sent you a stashed thought in a dual-modality sanctuary.",
    url: "https://harmonica-voice.vercel.app",
    siteName: "Harmonica Voice",
    images: [
      {
        url: "https://storage.googleapis.com/simple-bucket-27/7.jpg", // A static image of your Golden Tree
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
