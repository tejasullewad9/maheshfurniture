"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, BedDouble, Sofa, Frame, Utensils, DoorClosed, Hammer, Package, Trash2, Send, Lock } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { Product } from "@/types/furniture";
import { createClient } from "@/lib/supabase/client";

const STUDIO_TABS = [
  { id: "bedroom-furniture", label: "BED", categoryName: "Beds", icon: BedDouble, defaultImg: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85" },
  { id: "sofas", label: "SOFA", categoryName: "Sofas", icon: Sofa, defaultImg: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85" },
  { id: "dressing-tables", label: "DRESSING", categoryName: "Dressing Tables", icon: Frame, defaultImg: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85" },
  { id: "dining-furniture", label: "DINING", categoryName: "Dining Sets", icon: Utensils, defaultImg: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85" },
  { id: "doors-and-windows", label: "DOORS", categoryName: "Doors & Windows", icon: DoorClosed, defaultImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85" },
  { id: "custom-furniture", label: "CUSTOM", categoryName: "Custom Woodwork", icon: Hammer, defaultImg: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85" },
  { id: "manage", label: "INVENTORY", categoryName: "Manage", icon: Package, defaultImg: "" },
];

export default function CreatorStudioPage() {
  const supabase = createClient();
  const { user, loginWithGoogle, products, addProduct, deleteProduct } = useFavorites();
  const [activeTab, setActiveTab] = useState("bedroom-furniture");

  const [name, setName] = useState("");
  const [material, setMaterial] = useState("Pure Teak Wood");
  const [imageUrl, setImageUrl] = useState("");
  const [details, setDetails] = useState("");

  // Owner-Only Guard
  if (!user || !user.isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-3xl bg-white border border-stone-200/90 p-8 shadow-xs text-center space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-[#78350f]">
            <Lock className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-xl font-bold text-stone-900">Owner Access Only</h1>
            <p className="text-xs text-stone-500">
              Creator Studio is restricted to Mahesh Furniture administration. Sign in with the authorized owner Google account.
            </p>
          </div>
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full rounded-2xl bg-[#78350f] hover:bg-[#451a03] py-3.5 text-xs font-bold text-white shadow-xs cursor-pointer"
          >
            Sign In as Owner
          </button>
          <Link href="/" className="block text-xs font-semibold text-stone-500 hover:text-stone-800">
            ← Back to Showroom Feed
          </Link>
        </div>
      </div>
    );
  }

  const currentTabObj = STUDIO_TABS.find(t => t.id === activeTab) || STUDIO_TABS[0];

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Enter furniture title");

    const finalImage = imageUrl.trim() || currentTabObj.defaultImg;
    const newItem: Product = {
      id: `mf-${Date.now()}`,
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: `MF-${Math.floor(100 + Math.random() * 900)}`,
      categorySlug: currentTabObj.id,
      categoryName: currentTabObj.categoryName,
      shortDescription: details.trim() || `${material} • In-House Bhainsa Workshop`,
      description: details.trim() || material,
      material: material.trim() || "Pure Teak Wood",
      mainImage: finalImage,
      isFeatured: true,
      isPublished: true,
      createdAt: "Just now",
    };

    addProduct(newItem);

    try {
      await supabase.from("products").insert([{
        name: newItem.name,
        slug: newItem.slug,
        sku: newItem.sku,
        category_slug: newItem.categorySlug,
        category_name: newItem.categoryName,
        short_description: newItem.shortDescription,
        material: newItem.material,
        main_image: newItem.mainImage,
      }]);
    } catch {}

    setName("");
    setDetails("");
    setImageUrl("");
    alert(`Published to ${currentTabObj.categoryName} Feed!`);
  };

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-4 py-6 space-y-5">
      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 shadow-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-[#78350f]">
          <Sparkles className="h-3 w-3" /> Creator Studio
        </span>
        <h1 className="font-serif text-2xl font-bold text-stone-900 mt-2">
          Mahesh Furniture Studio
        </h1>
      </div>

      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {STUDIO_TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all ${
                  active
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab !== "manage" ? (
          <form onSubmit={handlePublish} className="space-y-3.5">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Enter ${currentTabObj.categoryName} title (e.g. Royal Carved Teak ${currentTabObj.label})...`}
              className="w-full rounded-2xl bg-stone-50 border border-stone-200/90 px-4 py-3 text-xs text-stone-900 focus:bg-white focus:outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Wood / Material (e.g. Pure Teak Wood)"
                className="w-full rounded-2xl bg-stone-50 border border-stone-200/90 px-4 py-3 text-xs text-stone-900 focus:bg-white focus:outline-none"
              />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Photo URL (optional - auto uses preset)"
                className="w-full rounded-2xl bg-stone-50 border border-stone-200/90 px-4 py-3 text-xs text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>

            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={`Type specifications, polish shade, or dimensions for ${currentTabObj.categoryName}...`}
              className="w-full rounded-2xl bg-stone-50 border border-stone-200/90 p-4 text-xs text-stone-900 focus:bg-white focus:outline-none"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#4f46e5] hover:bg-[#4338ca] py-3.5 text-xs font-bold text-white shadow-sm transition-all"
            >
              <Send className="h-3.5 w-3.5" /> 🚀 Publish Live to Showroom
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            {products.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 border border-stone-200/80 p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={item.mainImage} alt={item.name} className="h-12 w-12 rounded-xl object-cover shrink-0 bg-stone-200" />
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-[#78350f] uppercase">{item.categoryName}</span>
                    <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteProduct(item.id)}
                  className="shrink-0 rounded-xl bg-rose-50 hover:bg-rose-100 p-2.5 text-rose-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
