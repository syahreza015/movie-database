import type { Metadata } from 'next';
import '@/lib/styles/globals.css';
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';
import SearchComponent from '@/components/client/search';
import ThemeProviderComponent from '@/components/wrapper/theme';
import EnvProviderComponent from '@/components/wrapper/env';
import validEnv from '@/lib/utils/env';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';

const ScrollTopButton = dynamic(() => import('@/components/button/scrollTop'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Movie Database',
  description: 'Movie Database App using TMDB open API',
};

const DrawerComponent = dynamic(() => import('@/components/client/drawer'), {
  ssr: false,
});

const font = localFont({
  src: '../lib/fonts/open_sans.ttf',
  adjustFontFallback: 'Arial',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProviderComponent
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
          themes={['dark', 'light']}>
          <EnvProviderComponent env={validEnv}>
            <NextTopLoader
              color="blue"
              crawl
              showSpinner={false}
              height={3}
            />
            <DrawerComponent />
            {children}
            <Suspense>
              <SearchComponent />
            </Suspense>
            <ScrollTopButton />
          </EnvProviderComponent>
        </ThemeProviderComponent>
      </body>
    </html>
  );
};

export default RootLayout;
