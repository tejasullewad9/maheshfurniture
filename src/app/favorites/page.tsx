"use client";
import React from "react";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { PRODUCTS, SITE_CONFIG } from "@/lib/sample-data";
import { useFavorites } from "@/context/FavoritesContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const favProducts = PRODUCTS.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <div className="rounded-3xl bg-white border border-stone-200 p-6 shadow-xs">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Saved Favorites ({favProducts.length})</h1>
        <p className="text-xs text-stone-500 mt-1">Your shortlisted furniture items.</p>
      </div>

      {favProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favProducts.map(product => {
            const waUrl = getWhatsAppUrl(SITE_CONFIG.whatsappNumber, product.name, product.sku);
            return (
              <div key={product.id} className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                <div className="relative aspect-[4/3] bg-stone-100">
                  <img src={product.mainImage} alt={product.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-stone-900 text-sm">{product.name}</h3>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-2.5 text-xs font-semibold text-white shadow-xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Inquire Price
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-stone-200 p-12 text-center space-y-3">
          <p className="text-xs text-stone-500">No favorite items saved yet.</p>
          <Link href="/catalogue" className="inline-block rounded-xl bg-[#78350f] px-4 py-2 text-xs font-semibold text-white">
            Browse Catalogue
          </Link>
        </div>
      )}
    </div>
  );
}
