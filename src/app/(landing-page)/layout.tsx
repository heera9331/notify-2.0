import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Notify2.0",
  description: "Created by Heera Singh",
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
