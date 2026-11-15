"use client";
import React, { useState } from "react";
import {
  Search,
  MessageCircle,
  Heart,
  LayoutGrid,
  BedDouble,
  Sofa,
  Frame,
  Utensils,
  DoorClosed,
  Layers,
  Hammer,
} from "lucide-react";
import { CATEGORIES, SITE_CONFIG } from "@/lib/sample-data";
import { useFavorites } from "@/context/FavoritesContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "bedroom-furniture": BedDouble,
  "sofas": Sofa,
  "dressing-tables": Frame,
  "dining-furniture": Utensils,
  "doors-and-windows": DoorClosed,
  "divans": Layers,
  "custom-furniture": Hammer,
};

export default function CataloguePage() {
  const { products, isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = products.filter(p => {
    const matchCat = cat === "all" || p.categorySlug === cat;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-4 py-6 space-y-5">
      <div className="rounded-3xl bg-white border border-stone-200/90 p-5 shadow-xs space-y-3">
        <h1 className="font-serif text-xl font-bold text-stone-900">Catalogue ({filtered.length})</h1>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter furniture..."
            className="w-full rounded-2xl bg-stone-50 border border-stone-200 pl-10 pr-4 py-2.5 text-xs focus:bg-white focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <button
            type="button"
            onClick={() => setCat("all")}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold tracking-wide transition-all ${
              cat === "all" ? "bg-stone-900 text-white shadow-xs" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            ALL
          </button>
          {CATEGORIES.map(c => {
            const Icon = CATEGORY_ICONS[c.slug] || BedDouble;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.slug)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold tracking-wide transition-all ${
                  cat === c.slug ? "bg-stone-900 text-white shadow-xs" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {c.name.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(product => {
          const fav = isFavorite(product.id);
          const waUrl = getWhatsAppUrl(SITE_CONFIG.whatsappNumber, product.name, product.sku);
          const DeptIcon = CATEGORY_ICONS[product.categorySlug] || BedDouble;
          return (
            <div key={product.id} className="rounded-3xl bg-white border border-stone-200/90 overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-stone-100">
                <img src={product.mainImage} alt={product.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-xs ${
                    fav ? "bg-rose-500 text-white" : "bg-white/90 text-stone-700"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="p-4 space-y-2.5">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#78350f] uppercase">
                    <DeptIcon className="h-3 w-3" />
                    {product.categoryName}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm truncate mt-0.5">{product.name}</h3>
                  <p className="text-[11px] text-stone-500 truncate">{product.shortDescription}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 py-2.5 text-xs font-semibold text-white transition-all"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
