"use client";
import React from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/sample-data";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  const waUrl = getGeneralWhatsAppUrl(SITE_CONFIG.whatsappNumber);

  return (
    <div className="mx-auto max-w-xl px-4 py-6 space-y-6">
      <div className="rounded-3xl bg-white border border-stone-200 p-6 shadow-xs space-y-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-[#78350f]">
          <MapPin className="h-3 w-3" /> Showroom Location
        </span>
        <h1 className="font-serif text-2xl font-bold text-stone-900">Visit Mahesh Furniture</h1>
        <p className="text-xs text-stone-600 leading-relaxed font-medium">
          {SITE_CONFIG.showroomAddress}
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3 text-xs font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" /> Message on WhatsApp
        </a>
      </div>
    </div>
  );
}
