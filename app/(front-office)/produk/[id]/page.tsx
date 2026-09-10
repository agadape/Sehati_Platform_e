"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import { ChevronLeft, Minus, Plus, ShoppingCart, Share2, Heart, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const [qty, setQty] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="max-w-5xl mx-auto pb-28 md:pb-8 animate-in fade-in duration-300">
      {/* Mobile Back Header */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100" onClick={() => setIsLiked(!isLiked)}>
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push('/')}>Beranda</span>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <span className="cursor-pointer hover:text-blue-600">{product.category}</span>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
      </div>

      <div className="bg-white md:rounded-3xl md:shadow-sm md:border border-gray-100 overflow-hidden md:flex gap-0">
        
        {/* Product Image */}
        <div className="md:w-1/2 aspect-square bg-gray-50 p-8 relative flex items-center justify-center">
          {product.price > 20000 && (
            <div className="absolute top-6 left-6 z-10 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg shadow-red-500/30">
              PROMO SPESIAL
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="object-contain w-full h-full mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-500" />
        </div>
        
        {/* Product Info */}
        <div className="p-6 md:p-10 md:w-1/2 flex flex-col border-l border-gray-100">
          <div className="flex justify-between items-start">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 bg-blue-50 inline-block px-2.5 py-1 rounded-md">{product.category}</div>
            <div className="hidden md:flex gap-2">
              <button className="p-2.5 hover:bg-red-50 rounded-full transition-colors text-gray-400 hover:text-red-500" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button className="p-2.5 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
          <div className="text-3xl font-black text-blue-600 mb-6">Rp{product.price.toLocaleString('id-ID')}</div>
          
          <div className="border-t border-b border-gray-100 py-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Deskripsi Produk</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{product.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <div>
                <div className="text-xs text-gray-500 font-medium">Kualitas</div>
                <div className="text-sm font-bold text-gray-900">100% Original</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Truck className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500 font-medium">Pengiriman</div>
                <div className="text-sm font-bold text-gray-900">Sesuai Zonasi</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-700">Atur Jumlah</span>
            <span className="text-sm text-gray-500">Sisa stok: <span className="font-bold text-gray-900">{product.stock}</span></span>
          </div>

          {/* Sticky Bottom Actions on Mobile, inline on Desktop */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t md:static md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0 z-40 flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-xl h-14 w-36 justify-between px-2 bg-white">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>
              <span className="font-bold w-8 text-center text-lg">{qty}</span>
              <button 
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            
            <button className="flex-1 h-14 bg-blue-600 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all active:scale-[0.98]">
              <ShoppingCart className="w-5 h-5" />
              Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
