"use client";
import React from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Sparkles,
  Layers,
  Clock,
  Navigation,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/sample-data";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const MAPS_LINK_1 = "https://maps.app.goo.gl/KvK1pccnySAhMe2Y6";
export const MAPS_LINK_2 = "https://maps.app.goo.gl/oSuHjSDLSuJkJA5f7";

export default function AboutPage() {
  const whatsappUrl = getGeneralWhatsAppUrl(SITE_CONFIG.whatsappNumber);

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-4 py-6 space-y-5">
      {/* 1. Minimal Powerful Brand Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-[#451a03] via-[#78350f] to-[#3b1502] text-white p-6 sm:p-8 shadow-md space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 px-3 py-1 text-[11px] font-bold text-amber-200 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Bhainsa&apos;s Premier Teakwood Showroom
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          MAHESH FURNITURE
        </h1>
        <p className="text-xs sm:text-sm text-amber-100/95 leading-relaxed">
          Specializing exclusively in <strong>100% Pure Seasoned Teak Wood (Sagwan)</strong> residential and wedding furniture. Every piece is built for generational durability without artificial particle boards or commercial plywood.
        </p>
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="rounded-2xl bg-white/10 p-3 border border-white/15">
            <span className="text-[10px] uppercase text-amber-200 font-bold block">Founder</span>
            <span className="text-xs font-bold text-white">Mahesh Ullewad</span>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 border border-white/15">
            <span className="text-[10px] uppercase text-amber-200 font-bold block">Timber Grade</span>
            <span className="text-xs font-bold text-white">100% Pure Sagwan</span>
          </div>
        </div>
      </div>

      {/* 2. Core Furniture Departments */}
      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-[#78350f]">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              Available Collections
            </h2>
            <p className="text-xs text-stone-500">Ready display & custom size workshop builds</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { dept: "Beds & Bedroom Sets", items: "Carved King & Queen Beds, Hydraulic Storage, Wardrobes & Bedside Tables." },
            { dept: "Sofas & Loungers", items: "Teak Frame Carved Sofas, L-Shape Sectionals & 40D Foam Cushions." },
            { dept: "Dressing Units", items: "Full-Length Belgian Mirror Dressers with Storage Drawers & Stools." },
            { dept: "Dining Table Sets", items: "4, 6 & 8 Seater Heavy Teak Dining Tables with Cushioned Chairs." },
            { dept: "Doors & Windows", items: "Carved Entrance Teak Doors, Chaukhat Frames & Pooja Room Doors." },
            { dept: "Wedding Packages", items: "Complete customized marriage furniture bundle sets at showroom value." },
          ].map((d) => (
            <div key={d.dept} className="rounded-2xl bg-stone-50 border border-stone-200/80 p-3.5 space-y-1">
              <h3 className="text-xs font-bold text-[#78350f]">{d.dept}</h3>
              <p className="text-[11px] text-stone-600 leading-relaxed">{d.items}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Comprehensive Showroom Location & Contact */}
      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 shadow-xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900">
          Complete Showroom Location & Contact Details
        </h2>

        {/* Live Interactive Map Pin */}
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 h-52 w-full">
          <iframe
            title="Mahesh Furniture Bhainsa Map"
            src="https://www.google.com/maps?q=19.1018056,77.9728611&hl=en&z=17&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>

        <div className="space-y-2.5 text-xs text-stone-700">
          <div className="flex items-start gap-2.5 rounded-2xl bg-stone-50 p-3.5 border border-stone-200/70">
            <MapPin className="h-4 w-4 text-[#78350f] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block">Exact Showroom Address</span>
              Mahesh Furniture, Old Ola Showroom, Khatta Hotel, near HP Petrol Pump, Nirmal Road, Bhainsa, District Nirmal, Telangana — 504103
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-stone-50 p-3.5 border border-stone-200/70">
            <Clock className="h-4 w-4 text-[#78350f] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block">Operating Hours</span>
              Open Daily: 9:30 AM – 9:00 PM (Monday through Sunday - All 7 Days)
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-stone-50 p-3.5 border border-stone-200/70">
            <Phone className="h-4 w-4 text-[#78350f] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block">Showroom Lines</span>
              Showroom Line 2: +91 9370196535<br />
              Showroom Line 3: +91 8767569957
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 py-3.5 px-4 text-xs font-bold text-white shadow-xs transition-all"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Showroom
          </a>
          <a
            href={MAPS_LINK_1}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 hover:bg-stone-800 py-3.5 px-4 text-xs font-bold text-white shadow-xs transition-all"
          >
            <Navigation className="h-4 w-4 text-amber-400" /> Google Maps Link 1
          </a>
          <a
            href={MAPS_LINK_2}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 py-3.5 px-4 text-xs font-bold text-stone-900 transition-all"
          >
            <MapPin className="h-4 w-4 text-[#78350f]" /> Google Maps Pin 2
          </a>
        </div>
      </div>
    </div>
  );
}
