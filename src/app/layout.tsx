import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WarmAmbience from "./components/WarmAmbience";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Jasmine Li",
  description: "Jasmine's personal site",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}})()`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}>
        <div className="flex flex-col min-h-screen relative">
          <WarmAmbience />
          <Navbar />
          <main className="flex-grow px-6 max-w-[720px] mx-auto w-full relative z-[1]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
