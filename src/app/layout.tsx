import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";
import SplashScreen from "./components/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toni Camacho | Visual Creator",
  description: "Photography | Video | 3D | Design - High-end immersive portfolio by Toni Camacho.",
  keywords: ["Photography", "Video Production", "3D Art", "Graphic Design", "Toni Camacho"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} antialiased`}
      >
        <SplashScreen>
          <LanguageProvider>
            <SmoothScroll>
              <Navbar />
              {children}
              <Footer />
            </SmoothScroll>
          </LanguageProvider>
        </SplashScreen>
      </body>
    </html>
  );
}
