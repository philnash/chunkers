import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chunkers",
  description: "Different ways to chunk text in JavaScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
