import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} flex min-h-screen flex-col bg-white antialiased text-zinc-900`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}