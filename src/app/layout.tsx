import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Header from '@/components/header/header';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Type-It',
  description: 'A modern web application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLocale();

  return (
    <html lang={ lang } suppressHydrationWarning>
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-background text-foreground antialiased transition-colors`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange={false}
            themes={["light", "dark", "system"]}
          >
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
