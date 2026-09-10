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
        <div className="p-2 bg-brand-surface rounded-full shadow-soft border border-brand-border cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5 text-brand-ink" />
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-brand-surface rounded-full shadow-soft border border-brand-border" onClick={() => setIsLiked(!isLiked)}>
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-brand-ink'}`} />
          </button>
          <button className="p-2 bg-brand-surface rounded-full shadow-soft border border-brand-border">
            <Share2 className="w-5 h-5 text-brand-ink" />
          </button>
        </div>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm text-brand-ink-muted mb-6 font-medium">
        <span className="cursor-pointer hover:text-brand-ink" onClick={() => router.push('/')}>Beranda</span>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <span className="cursor-pointer hover:text-brand-ink">{product.category}</span>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <span className="text-brand-ink truncate max-w-xs">{product.name}</span>
      </div>

      <div className="bg-brand-surface md:rounded-3xl md:shadow-soft md:border border-brand-border overflow-hidden md:flex gap-0">
        
        {/* Product Image */}
        <div className="md:w-1/2 aspect-square bg-brand-bg p-8 relative flex items-center justify-center">
          {product.price > 20000 && (
            <div className="absolute top-6 left-6 z-10 bg-red-500 text-white text-xs font-black font-display px-3 py-1.5 rounded-xl shadow-soft shadow-red-500/30">
              PROMO SPESIAL
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="object-contain w-full h-full mix-blend-multiply drop-shadow-soft hover:scale-105 transition-transform duration-500" />
        </div>
        
        {/* Product Info */}
        <div className="p-6 md:p-10 md:w-1/2 flex flex-col border-l border-brand-border">
          <div className="flex justify-between items-start">
            <div className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-2 bg-brand/10 inline-block px-2.5 py-1 rounded-md">{product.category}</div>
            <div className="hidden md:flex gap-2">
              <button className="p-2.5 hover:bg-red-50 rounded-full transition-colors text-brand-ink-muted hover:text-red-500" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button className="p-2.5 hover:bg-brand-bg rounded-full transition-colors text-brand-ink-muted hover:text-brand-ink-muted">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold font-display text-brand-ink mb-4 leading-tight">{product.name}</h1>
          <div className="text-3xl font-black font-display text-brand-ink mb-6">Rp{product.price.toLocaleString('id-ID')}</div>
          
          <div className="border-t border-b border-brand-border py-6 mb-6">
            <h3 className="font-bold text-brand-ink mb-3 text-lg font-display">Deskripsi Produk</h3>
            <p className="text-brand-ink-muted text-sm md:text-base leading-relaxed">{product.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-brand-bg rounded-xl">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <div>
                <div className="text-xs text-brand-ink-muted font-medium">Kualitas</div>
                <div className="text-sm font-bold text-brand-ink">100% Original</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-brand-bg rounded-xl">
              <Truck className="w-6 h-6 text-brand" />
              <div>
                <div className="text-xs text-brand-ink-muted font-medium">Pengiriman</div>
                <div className="text-sm font-bold text-brand-ink">Sesuai Zonasi</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-brand-ink">Atur Jumlah</span>
            <span className="text-sm text-brand-ink-muted">Sisa stok: <span className="font-bold text-brand-ink">{product.stock}</span></span>
          </div>

          {/* Sticky Bottom Actions on Mobile, inline on Desktop */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-surface/90 backdrop-blur-md border-t md:static md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0 z-40 flex items-center gap-4">
            <div className="flex items-center border-2 border-brand-border rounded-xl h-14 w-36 justify-between px-2 bg-brand-surface">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-brand-ink-muted hover:bg-brand-bg transition-colors"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>
              <span className="font-bold w-8 text-center text-lg">{qty}</span>
              <button 
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-brand-ink-muted hover:bg-brand-bg transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            
            <button className="flex-1 h-14 bg-brand text-white font-bold text-lg rounded-full flex items-center justify-center gap-2 hover:bg-brand hover:shadow-soft hover:shadow-soft transition-all active:scale-[0.98]">
              <ShoppingCart className="w-5 h-5" />
              Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
