import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import '@styles/globals.scss';

export const metadata: Metadata = {
  title: 'Kaan Ozgunay',
  description: 'KO Portfolio Site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </>
  );
}
