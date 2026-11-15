"use client";
import React, { useState } from "react";
import { Hammer, MessageCircle, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/sample-data";

export default function CustomInquiryPage() {
  const [form, setForm] = useState({ name: "", phone: "", type: "Teak Wood Bed", details: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.details) {
      alert("Please fill all required fields.");
      return;
    }
    const msg = `Hello Mahesh Furniture! Custom Order Request:\nName: ${form.name}\nPhone: ${form.phone}\nType: ${form.type}\nDetails: ${form.details}`;
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6 space-y-6">
      <div className="rounded-3xl bg-white border border-stone-200 p-6 shadow-xs space-y-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-[#78350f]">
          <Hammer className="h-3 w-3" /> Workshop Custom Orders
        </span>
        <h1 className="font-serif text-2xl font-bold text-stone-900">Request Custom Furniture</h1>
        <p className="text-xs text-stone-600">Built precisely to your room dimensions and wood finish requirements.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl bg-white border border-stone-200 p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Your Full Name *</label>
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
          <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Phone Number *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="e.g. 9876543210"
            className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-3 text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Furniture Type</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-3 text-xs"
          >
            <option value="Teak Wood Bed">Teak Wood Bed</option>
            <option value="Sofa Set">Sofa Set</option>
            <option value="Dining Table">Dining Table Set</option>
            <option value="Main Door">Main Entrance Door</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Design & Dimension Details *</label>
          <textarea
            required
            rows={4}
            value={form.details}
            onChange={e => setForm({ ...form, details: e.target.value })}
            placeholder="Describe wood polish shade, dimensions, or carving requirements..."
            className="w-full rounded-2xl bg-stone-50 border border-stone-200 p-4 text-xs"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 py-3 text-xs font-semibold text-white shadow-xs"
        >
          <Send className="h-4 w-4" /> Send Request on WhatsApp
        </button>
      </form>
    </div>
  );
}
