import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KINT Kafri International | Manufacturer of Biostimulants & Specialty Fertilizers",
  description: "Kafri International (KINT) is a leading global manufacturer of biostimulants, specialty fertilizers, and animal health products for sustainable agriculture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
