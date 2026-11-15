"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { PRODUCTS } from "@/lib/sample-data";
import { Product } from "@/types/furniture";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  isAdmin: boolean;
}

const ADMIN_EMAILS = ["ullewadtejas@gmail.com", "coresoftwaresystems4u@gmail.com"];

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  products: Product[];
  addProduct: (item: Product) => void;
  deleteProduct: (id: string) => void;
  user: AppUser | null;
  authLoading: boolean;
  isSigningIn: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [user, setUser] = useState<AppUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const popupLockRef = useRef(false);

  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("mf_favorites");
      if (savedFavs) setFavoriteIds(JSON.parse(savedFavs));

      const savedProducts = localStorage.getItem("mf_feed_products");
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) setProducts(parsed);
      }
    } catch {}

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const email = (firebaseUser.email || "").toLowerCase();
        const isAdmin = ADMIN_EMAILS.includes(email);
        const mappedUser: AppUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || email.split("@")[0] || "Member",
          email,
          photoURL: firebaseUser.photoURL || "",
          isAdmin,
        };
        setUser(mappedUser);

        try {
          await setDoc(
            doc(db, "mahesh_furniture_users", firebaseUser.uid),
            {
              uid: firebaseUser.uid,
              name: mappedUser.name,
              email: mappedUser.email,
              photoURL: mappedUser.photoURL,
              role: isAdmin ? "admin" : "member",
              lastLogin: serverTimestamp(),
            },
            { merge: true }
          );
        } catch {}
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (popupLockRef.current) return;
    popupLockRef.current = true;
    setIsSigningIn(true);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      const ignoredCodes = [
        "auth/popup-closed-by-user",
        "auth/cancelled-popup-request",
      ];
      if (!ignoredCodes.includes(error?.code)) {
        if (error?.code === "auth/popup-blocked") {
          alert("Please allow popups in your browser to sign in with Google.");
        } else {
          alert("Google Sign-In warning: " + (error?.message || "Please try again."));
        }
      }
    } finally {
      popupLockRef.current = false;
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch {}
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem("mf_favorites", JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const addProduct = (item: Product) => {
    setProducts(prev => {
      const next = [item, ...prev];
      localStorage.setItem("mf_feed_products", JSON.stringify(next));
      return next;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem("mf_feed_products", JSON.stringify(next));
      return next;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        products,
        addProduct,
        deleteProduct,
        user,
        authLoading,
        isSigningIn,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}
