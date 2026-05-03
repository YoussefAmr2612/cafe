import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css'; // Global styles
import { AppProvider } from './context';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Coffee Map - Minimalist Coffee',
  description: 'Coffee Map concept',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#fcfaf9] text-[#000000] dark:bg-[#000000] dark:text-[#fcfaf9] transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppProvider>
            <Navbar />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
