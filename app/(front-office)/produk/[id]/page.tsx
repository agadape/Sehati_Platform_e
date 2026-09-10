"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const [qty, setQty] = useState(1);

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-0">
      {/* Mobile Back Header */}
      <div className="md:hidden flex items-center gap-3 mb-4 cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-800">Kembali</span>
      </div>

      <div className="bg-white md:border rounded-xl overflow-hidden md:p-6 md:flex gap-8">
        <div className="md:w-1/2 aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
        </div>
        
        <div className="p-4 md:p-0 md:w-1/2 flex flex-col">
          <div className="text-sm text-blue-600 font-medium mb-1">{product.category}</div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="text-2xl font-bold text-blue-600 mb-4">Rp{product.price.toLocaleString('id-ID')}</div>
          
          <div className="border-t border-b py-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Deskripsi Produk</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">Stok: <span className="font-medium text-gray-900">{product.stock}</span></span>
          </div>

          {/* Sticky Bottom Actions on Mobile, inline on Desktop */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:static md:p-0 md:border-0 z-40 flex items-center gap-4">
            <div className="flex items-center border rounded-lg h-12 w-32 justify-between px-2 bg-gray-50">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium w-8 text-center">{qty}</span>
              <button 
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button className="flex-1 h-12 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
