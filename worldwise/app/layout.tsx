import type { Metadata } from 'next';
import './globals.css';

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
      <body className="font-inter antialiased">
        {/* Temporary nav/footer so we can see structure */}
        <header className="bg-navy text-white py-6 text-center text-2xl font-montserrat">
          WorldWise Educational Tours
        </header>
        <main>{children}</main>
        <footer className="bg-navy text-white py-8 text-center">
          © 2025 WorldWise Educational Tours – Mbabane, Eswatini
        </footer>
      </body>
    </html>
  );
}
