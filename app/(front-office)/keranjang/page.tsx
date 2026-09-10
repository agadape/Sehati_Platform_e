"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Trash2, AlertCircle } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  // Dummy cart items
  const [items, setItems] = useState([
    { product: mockProducts[0], qty: 2 },
    { product: mockProducts[2], qty: 1 }
  ]);

  const updateQty = (index: number, newQty: number) => {
    if (newQty < 1) return;
    const newItems = [...items];
    newItems[index].qty = newQty;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const minOrder = 100000;
  const isEligible = subtotal >= minOrder;

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-0">
      <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <h1 className="text-xl font-bold text-gray-900">Keranjang Belanja</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-500 mb-6">Yuk mulai belanja kebutuhanmu!</p>
          <Link href="/" className="inline-block bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="md:flex gap-6">
          <div className="md:flex-1 space-y-4">
            {items.map((item, index) => (
              <div key={item.product.id} className="bg-white p-4 rounded-xl border flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-2 text-sm md:text-base leading-snug">{item.product.name}</h3>
                    <div className="text-blue-600 font-bold mt-1">Rp{item.product.price.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <button onClick={() => removeItem(index)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center border rounded-md h-8">
                      <button onClick={() => updateQty(index, item.qty - 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(index, item.qty + 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-0 md:w-80">
            <div className="bg-white p-5 rounded-xl border sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Ringkasan Belanja</h3>
              
              <div className="flex justify-between mb-2 text-gray-600 text-sm">
                <span>Total Harga ({items.length} Barang)</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>
              
              <div className="border-t my-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
                <span>Subtotal</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>

              {!isEligible && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg flex gap-2 text-sm mb-4 border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>Tambah belanja <strong>Rp{(minOrder - subtotal).toLocaleString('id-ID')}</strong> lagi untuk mencapai minimum order Rp100.000.</p>
                </div>
              )}

              <button 
                onClick={() => router.push('/checkout')}
                disabled={!isEligible}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lanjut ke Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
