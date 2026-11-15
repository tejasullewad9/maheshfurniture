"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Heart,
  Search,
  CheckCircle2,
  LayoutGrid,
  BedDouble,
  Sofa,
  Frame,
  Utensils,
  DoorClosed,
  Layers,
  Hammer,
  MapPin,
  Award,
} from "lucide-react";
import { CATEGORIES, SITE_CONFIG } from "@/lib/sample-data";
import { useFavorites } from "@/context/FavoritesContext";
import { getWhatsAppUrl, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { SHOWROOM_MAPS_URL } from "@/components/layout/Navbar";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "bedroom-furniture": BedDouble,
  "sofas": Sofa,
  "dressing-tables": Frame,
  "dining-furniture": Utensils,
  "doors-and-windows": DoorClosed,
  "divans": Layers,
  "custom-furniture": Hammer,
};

export default function HomePage() {
  const { products, isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter(p => {
    const matchesTab = activeTab === "all" || p.categorySlug === activeTab;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.material.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const whatsappDesk = getGeneralWhatsAppUrl(SITE_CONFIG.whatsappNumber);

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-4 py-6 space-y-5">
      {/* Grand Mahesh Furniture Brand Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#451a03] via-[#78350f] to-[#5c280b] text-white p-6 sm:p-8 shadow-md space-y-5 relative overflow-hidden">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            MAHESH FURNITURE
          </h1>
          <a
            href={SHOWROOM_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-amber-100 hover:text-white underline-offset-4 hover:underline font-medium pt-1"
          >
            <MapPin className="h-4 w-4 text-amber-300 shrink-0" />
            Old Ola Showroom, Khatta Hotel, near HP Petrol Pump, Nirmal Road, Bhainsa
          </a>
        </div>

        {/* All Furniture Types Available Pills */}
        <div className="space-y-2 border-t border-white/15 pt-3.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200/90 block">
            All Types of Teak Furniture Available:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              "🛏️ Carved King & Queen Beds",
              "🛋️ Teak & Cushion Sofas",
              "🪞 Dressing Tables",
              "🍽️ Dining Table Sets",
              "🚪 Carved Main Doors & Windows",
              "🛋️ Wooden Divans & Mattresses",
              "🗄️ Teak Wardrobes & TV Units",
              "🛠️ Custom Size Orders",
            ].map(item => (
              <span
                key={item}
                className="rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Row: WhatsApp + Full Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <a
            href={whatsappDesk}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-3.5 px-4 text-xs font-bold text-white shadow-sm transition-all"
          >
            <MessageCircle className="h-4 w-4" /> Inquire on WhatsApp
          </a>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 py-3.5 px-4 text-xs font-bold text-white transition-all"
          >
            <Award className="h-4 w-4 text-amber-300" /> Full Showroom Details
          </Link>
        </div>
      </div>

      {/* Search & Furniture Icon Filter Bar */}
      <div className="rounded-3xl bg-white border border-stone-200/90 p-4 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pure teak beds, sofas, dressing tables, doors..."
            className="w-full rounded-2xl bg-stone-50 border border-stone-200/80 pl-10 pr-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all ${
              activeTab === "all"
                ? "bg-stone-900 text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            ALL ({products.length})
          </button>
          {CATEGORIES.map(cat => {
            const Icon = CATEGORY_ICONS[cat.slug] || BedDouble;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.slug)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all ${
                  activeTab === cat.slug
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.name.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Advait Academy Style Feed Stream */}
      <div className="space-y-5">
        {filtered.map(product => {
          const fav = isFavorite(product.id);
          const waUrl = getWhatsAppUrl(SITE_CONFIG.whatsappNumber, product.name, product.sku);
          const DeptIcon = CATEGORY_ICONS[product.categorySlug] || BedDouble;
          return (
            <article
              key={product.id}
              className="rounded-3xl bg-white border border-stone-200/90 overflow-hidden shadow-xs transition-all"
            >
              <div className="px-5 py-3.5 flex items-center justify-between border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#78350f] text-white">
                    <DeptIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-stone-900">Mahesh Furniture</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 fill-amber-100" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium block">
                      {product.categoryName} • {product.sku}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-amber-50 border border-amber-200/60 px-2.5 py-1 text-[10px] font-semibold text-[#78350f]">
                  {product.material}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h2 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                    {product.name}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-2xl px-4 py-3 text-xs font-semibold border transition-all ${
                      fav
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${fav ? "fill-rose-500 text-rose-500" : ""}`} />
                    {fav ? "Saved" : "Save"}
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 py-3 px-4 text-xs font-semibold text-white shadow-xs transition-all"
                  >
                    <MessageCircle className="h-4 w-4" /> Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
