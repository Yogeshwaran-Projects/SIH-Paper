import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from '@/components/ui/sonner';
import { dark } from '@clerk/themes';

import './globals.css';
import { ThemeProvider } from './components/theme-provider';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <UserProvider>
        <html lang="en">
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SignedIn>
                {children} {/* Theme applies here and on all child components */}
                <Toaster />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </ThemeProvider>
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}
