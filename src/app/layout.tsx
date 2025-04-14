import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes"
import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { TRPCReactProvider } from "~/trpc/react";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "GitChat",
  description: "Ask questions, get insights, and understand your codebase faster with AI-powered repository chat.",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider> 
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <NextTopLoader color="#16A34A"/>
          <TRPCReactProvider>
            {children}
            
            </TRPCReactProvider>
          <Toaster richColors/>
        </body>
      </html>
    </ClerkProvider>
  );
}
