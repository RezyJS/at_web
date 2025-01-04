import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Active Citizen",
  description: "An app to commit problems to the powerful people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  );
}
