"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

export const SHOWROOM_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mahesh+Furniture+Old+Ola+Showroom+Khatta+Hotel+near+HP+Petrol+Pump+Nirmal+Road+Bhainsa";

export function Navbar() {
  const { user, loginWithGoogle } = useFavorites();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/70">
      <div className="mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#78350f] text-white font-serif font-bold text-lg shadow-xs">
            M
          </div>
          <span className="font-serif text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            Mahesh Furniture
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Direct Google Maps Location Button */}
          <a
            href={SHOWROOM_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 hover:bg-stone-200 px-3.5 py-2 text-xs font-bold text-stone-800 transition-all"
          >
            <MapPin className="h-3.5 w-3.5 text-[#78350f]" />
            <span>Location</span>
          </a>

          {/* Studio Button: Strictly Visible Only for Owner/Admin */}
          {user?.isAdmin && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#78350f] hover:bg-[#451a03] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all"
            >
              <span>👑 Studio</span>
            </Link>
          )}

          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-full bg-stone-100 hover:bg-stone-200 p-1 pr-3 transition-all"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#78350f] text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-xs font-bold text-stone-800 hidden sm:inline">
                {user.name.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={loginWithGoogle}
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-stone-50 border border-stone-300 px-3.5 py-2 text-xs font-bold text-stone-800 shadow-xs transition-all cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
