import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'WorldWise Educational Tours',
  description: 'Connecting Learning with Exploration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased bg-white dark:bg-black text-navy dark:text-white">
        <Nav />
        <main>{children}</main>
        {/* Footer stays here – we’ll upgrade it next brick */}
        <footer className="bg-navy text-white py-12 text-center">
          © 2025 WorldWise Educational Tours – Mbabane, Eswatini
        </footer>
      </body>
    </html>
  );
}
