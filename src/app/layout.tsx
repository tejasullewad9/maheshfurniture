import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata = {
  title: "Mahesh Furniture | Bhainsa Showroom",
  description: "Handcrafted pure teak wood furniture in Bhainsa, Telangana.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf9f6] text-stone-900 pb-36 sm:pb-28">
        <FavoritesProvider>
          <Navbar />
          <main className="px-3 sm:px-6">{children}</main>
          <BottomNav />
        </FavoritesProvider>
      </body>
    </html>
  );
}
