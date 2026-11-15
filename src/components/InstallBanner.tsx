"use client";
import React, { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user already downloaded/dismissed
    const downloaded = localStorage.getItem("mahesh_furniture_installed");
    if (downloaded === "true") {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is running in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        localStorage.setItem("mahesh_furniture_installed", "true");
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  const handleDismiss = () => {
    setIsInstalled(true);
    localStorage.setItem("mahesh_furniture_installed", "true");
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Persistent Download Banner */}
      <div className="fixed bottom-16 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl bg-[#78350f] p-4 text-white shadow-2xl flex items-center justify-between border-2 border-amber-400">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-2.5">
            <Smartphone className="h-6 w-6 text-amber-200" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Download Mahesh Furniture</h4>
            <p className="text-[10px] text-amber-100">Add to your home screen for instant access!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-[#78350f] shadow-md hover:bg-amber-50 transition-all flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </button>
          <button
            onClick={handleDismiss}
            className="p-1.5 text-amber-200 hover:text-white rounded-lg hover:bg-white/10 transition-all"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Browser Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-stone-900 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-[#78350f]">Install App</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              To install the app on your phone or computer:
            </p>
            <ol className="text-xs text-stone-700 space-y-2 list-decimal list-inside bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <li>Open your browser menu (three dots at the top).</li>
              <li>Select <strong className="text-[#78350f]">"Install app"</strong> or <strong className="text-[#78350f]">"Add to Home Screen"</strong>.</li>
              <li>Confirm to add it!</li>
            </ol>
            <button
              onClick={() => {
                setShowModal(false);
                setIsInstalled(true);
                localStorage.setItem("mahesh_furniture_installed", "true");
              }}
              className="w-full bg-[#78350f] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#5c280b] transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}