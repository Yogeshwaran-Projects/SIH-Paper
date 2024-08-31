import { ClerkProvider } from '@clerk/nextjs';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from "@/components/ui/sonner"

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en">
          <body>
            {children}
            <Toaster />

          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}