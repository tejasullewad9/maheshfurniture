"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, Sparkles, Info } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

export function BottomNav() {
  const pathname = usePathname();
  const { favoriteIds, user } = useFavorites();

  const navItems = [
    { name: "Home", href: "/", icon: Home, show: true },
    { name: "Catalogue", href: "/catalogue", icon: Compass, show: true },
    { name: "Profile", href: "/profile", icon: User, badge: favoriteIds.length, show: true },
    { name: "Studio", href: "/admin", icon: Sparkles, show: Boolean(user?.isAdmin) },
    { name: "About", href: "/about", icon: Info, show: true },
  ].filter(item => item.show);

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-stone-200/90 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#78350f] text-white shadow-xs"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{item.name}</span>
              {item.badge ? (
                <span
                  className={`ml-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                    isActive ? "bg-white text-[#78350f]" : "bg-rose-500 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
