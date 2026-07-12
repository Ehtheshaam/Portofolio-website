import type { Metadata, Viewport } from "next";
import { AppWrapper } from "@/components/AppWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaik Ehthe Shaamulhaq | Computer Science Engineer & AI Enthusiast",
  description:
    "Student Portfolio of Shaik Ehthe Shaamulhaq, a final-year Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, and Data Engineering pipelines. Developer of VOGA and HealthConnect.",
  keywords: [
    "Shaik Ehthe Shaamulhaq",
    "Ehthe Shaam",
    "Computer Science Engineering",
    "Student Portfolio",
    "AI Enthusiast",
    "Data Engineering Student",
    "VOGA AI Recommendation",
    "HealthConnect Telemedicine",
    "Dhaanish Ahmed College of Engineering",
    "Internship Candidate",
  ],
  authors: [{ name: "Shaik Ehthe Shaamulhaq" }],
  creator: "Shaik Ehthe Shaamulhaq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ehtheshaam.dev",
    title: "Shaik Ehthe Shaamulhaq | Computer Science Engineer & AI Enthusiast",
    description:
      "Student Portfolio of Shaik Ehthe Shaamulhaq, a Computer Science Engineering student passionate about AI and Data Engineering.",
    siteName: "Shaik Ehthe Shaamulhaq Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaik Ehthe Shaamulhaq | Computer Science Engineer & AI Enthusiast",
    description:
      "Student Portfolio of Shaik Ehthe Shaamulhaq, a Computer Science Engineering student passionate about AI and Data Engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#EAEAE4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth select-none">
      <body className="min-h-full bg-background text-foreground antialiased">
        {/* Main application animations wrapper */}
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
