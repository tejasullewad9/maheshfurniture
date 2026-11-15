"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // or your auth state
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(true); // Set to true or tie to your auth email
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("bedroom-furniture");
  const [material, setMaterial] = useState("100% Pure Teak Wood");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Adding New Product & Photo URL
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) {
      alert("Please enter a product name and image URL.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        name,
        categorySlug: category,
        material,
        mainImage: imageUrl,
        createdAt: new Date().toISOString(),
      });
      setName("");
      setImageUrl("");
      fetchProducts();
      alert("Product and photo added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Deleting Product & Photo
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <div className="rounded-3xl bg-[#78350f] text-white p-6 shadow-md space-y-2">
        <h1 className="font-serif text-3xl font-bold">Mahesh Furniture Creator Studio</h1>
        <p className="text-xs text-amber-100">Add new teakwood arrivals or delete old listings instantly from the cloud database.</p>
      </div>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="rounded-3xl bg-white border border-stone-200 p-6 shadow-xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-[#78350f]" /> Add New Furniture Item & Photo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Royal Carved Teak Bed"
              className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900"
            >
              <option value="bedroom-furniture">Bedroom Furniture</option>
              <option value="sofas">Sofas & Loungers</option>
              <option value="dressing-tables">Dressing Tables</option>
              <option value="dining-furniture">Dining Furniture</option>
              <option value="doors-and-windows">Doors & Windows</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Material / Tag</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Photo Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-2xl bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#78350f] hover:bg-[#5c280b] py-3 text-xs font-bold text-white shadow-xs transition-all"
        >
          {loading ? "Adding Product..." : "Publish Product to Showroom"}
        </button>
      </form>

      {/* Existing Products List with Delete */}
      <div className="rounded-3xl bg-white border border-stone-200 p-6 shadow-xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900">Manage Existing Showroom Inventory</h2>
        {products.length === 0 ? (
          <p className="text-xs text-stone-500">No custom items in database yet. Add your first item above!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-3">
                  <img src={item.mainImage} alt={item.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">{item.name}</h3>
                    <span className="text-[10px] text-stone-500">{item.material}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(item.id)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
                  title="Delete Product"
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