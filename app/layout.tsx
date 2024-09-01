import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from '@/components/ui/sonner';
import { dark } from '@clerk/themes';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <UserProvider>
        <html lang="en">
          <body>
            <SignedIn>
              {children}
              <Toaster />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}
