"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  MessageCircle,
  LogOut,
  CheckCircle2,
  Loader2,
  Trash2,
  Hammer,
  Send,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/sample-data";
import { getGeneralWhatsAppUrl, getWhatsAppUrl } from "@/lib/whatsapp";
import { useFavorites } from "@/context/FavoritesContext";

export default function ProfilePage() {
  const { user, authLoading, isSigningIn, products, favoriteIds, toggleFavorite, loginWithGoogle, logout } = useFavorites();
  const [activeSection, setActiveSection] = useState<"favorites" | "custom">("favorites");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Pure Teak Wood King Bed",
    details: "",
  });

  const whatsappUrl = getGeneralWhatsAppUrl(SITE_CONFIG.whatsappNumber);
  const savedProducts = products.filter(p => favoriteIds.includes(p.id));

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.details) {
      alert("Please fill all required fields.");
      return;
    }
    const msg = `Hello Mahesh Furniture (Bhainsa)! Custom Pure Teak Order Request:\nName: ${form.name}\nPhone: ${form.phone}\nFurniture Type: ${form.type}\nSpecifications & Size: ${form.details}`;
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="h-7 w-7 animate-spin text-[#78350f]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-4 py-6 space-y-5">
      {/* Top Account Card: Google Login or Logged-in User Profile */}
      {!user ? (
        <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-xs text-center space-y-5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#78350f] text-white font-serif text-3xl font-bold shadow-sm">
            M
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Mahesh Furniture Profile
            </h1>
            <p className="text-xs text-stone-500">
              Sign in with Google to sync your saved furniture wishlist and access Creator Studio.
            </p>
          </div>
          <button
            type="button"
            disabled={isSigningIn}
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 px-5 py-3.5 text-xs font-bold text-stone-800 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isSigningIn ? "Opening Google Sign-In..." : "Continue with Google"}
          </button>
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-20 w-20 rounded-full object-cover border-2 border-amber-200 shadow-xs"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#78350f] text-white font-serif text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 space-y-1">
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 px-3 py-0.5 text-[11px] font-bold text-[#78350f]">
                {user.isAdmin ? "👑 FOUNDER & ADMIN" : "✨ VERIFIED MEMBER"}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <h1 className="font-serif text-2xl font-bold text-stone-900">{user.name}</h1>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-xs text-stone-500">{user.email}</p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-rose-50 hover:bg-rose-100 px-4 py-2.5 text-xs font-bold text-rose-600 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>

          {user.isAdmin && (
            <div className="pt-2 border-t border-stone-100 flex justify-between items-center">
              <span className="text-xs font-semibold text-stone-500">Showroom Admin Controls</span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#78350f] px-4 py-2 text-xs font-bold text-white"
              >
                <Sparkles className="h-3.5 w-3.5" /> Open Creator Studio →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Switcher Tabs inside Profile: Saved Favorites vs Custom Furniture Order */}
      <div className="grid grid-cols-2 gap-2.5 rounded-3xl bg-white border border-stone-200/90 p-2 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveSection("favorites")}
          className={`flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all cursor-pointer ${
            activeSection === "favorites"
              ? "bg-[#78350f] text-white shadow-xs"
              : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <Heart className={`h-4 w-4 ${activeSection === "favorites" ? "fill-white" : "text-rose-500 fill-rose-500"}`} />
          Saved Favorites ({savedProducts.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("custom")}
          className={`flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all cursor-pointer ${
            activeSection === "custom"
              ? "bg-[#78350f] text-white shadow-xs"
              : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <Hammer className="h-4 w-4" />
          Custom Furniture Order
        </button>
      </div>

      {/* Section 1: Saved Favorites List */}
      {activeSection === "favorites" ? (
        <div className="rounded-3xl bg-white border border-stone-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              Your Saved Teak Furniture ({savedProducts.length})
            </h2>
            <Link href="/catalogue" className="text-xs font-bold text-[#78350f] hover:underline">
              Explore Catalogue →
            </Link>
          </div>

          {savedProducts.length === 0 ? (
            <p className="text-xs text-stone-500 py-8 text-center">
              No saved furniture items yet. Tap &ldquo;Save&rdquo; on any bed, sofa, or dressing table in the feed to shortlist it here.
            </p>
          ) : (
            <div className="space-y-3">
              {savedProducts.map(item => {
                const waUrl = getWhatsAppUrl(SITE_CONFIG.whatsappNumber, item.name, item.sku);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 border border-stone-200/80 p-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="h-14 w-14 rounded-xl object-cover shrink-0 bg-stone-200"
                      />
                      <div className="truncate">
                        <span className="text-[10px] font-bold text-[#78350f] uppercase">{item.categoryName}</span>
                        <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-stone-500 truncate">{item.material}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-emerald-700 hover:bg-emerald-800 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Inquire
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.id)}
                        className="rounded-xl bg-rose-50 hover:bg-rose-100 p-2 text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Section 2: Custom Pure Teak Order Form inside Profile */
        <form onSubmit={handleCustomSubmit} className="rounded-3xl bg-white border border-stone-200/90 p-6 shadow-xs space-y-4">
          <div className="space-y-1 border-b border-stone-100 pb-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-bold text-[#78350f]">
              <Hammer className="h-3 w-3" /> In-House Bhainsa Teak Workshop
            </span>
            <h2 className="font-serif text-xl font-bold text-stone-900 pt-1">
              Request Custom Size / Design Furniture
            </h2>
            <p className="text-xs text-stone-500">
              We craft custom 100% pure teak wood furniture according to your exact room dimensions, carving design, and polish shade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ramesh Patil"
                className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-3 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Furniture Category</label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-3 text-xs"
            >
              <option value="Pure Teak Wood King Bed">Pure Teak Wood King / Queen Bed</option>
              <option value="Teak & Cushion Sofa Set">Teak & Cushion Sofa Set / L-Shape</option>
              <option value="Teak Wood Dressing Table">Teak Wood Dressing Table</option>
              <option value="6-Seater / 8-Seater Teak Dining Set">6-Seater / 8-Seater Teak Dining Set</option>
              <option value="Carved Teak Main Entrance Door">Carved Teak Main Entrance Door & Frame</option>
              <option value="Complete Wedding Furniture Package">Complete Wedding / Home Furniture Set</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Dimensions, Wood Polish & Design Details *</label>
            <textarea
              required
              rows={4}
              value={form.details}
              onChange={e => setForm({ ...form, details: e.target.value })}
              placeholder="Enter required size (e.g. 6x6.5 ft bed), hydraulic storage, natural teak gloss polish, or reference design..."
              className="w-full rounded-2xl bg-stone-50 border border-stone-200 p-4 text-xs"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 py-3.5 text-xs font-bold text-white shadow-xs cursor-pointer"
          >
            <Send className="h-4 w-4" /> Send Custom Order to Showroom WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
