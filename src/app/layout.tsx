import "@/app/globals.css";
import type { Metadata } from "next";
import FooterSwitcher from "@/components/FooterSwitcher";
import HeaderSwitcher from "@/components/HeaderSwitcher"; // <-- add

export const metadata: Metadata = {
  title: "GTN College of Pharmacy | GTN Group of Institutions",
  description: "GTN College of Pharmacy under G.T. Narayanaswamy Naidu Charities Trust, Dindigul, Tamil Nadu.",
  metadataBase: new URL("https://gtnarayanaswamynaiducharitiestrust.org"),
  other: {
    "google-fonts":
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <HeaderSwitcher /> {/* <-- swaps HomeHeader vs Header */}
        <main className="flex-1">{children}</main>
        <FooterSwitcher />
      </body>
    </html>
  );
}

