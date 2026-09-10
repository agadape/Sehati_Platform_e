"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Plus, Sparkles, Check } from "lucide-react";
import { mockProducts, mockZones } from "@/lib/mock-data";

export default function CatalogPage() {
  const [selectedZone, setSelectedZone] = useState(mockZones[0].id);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = ['Semua', 'Sembako', 'Makanan', 'Minuman', 'Cemilan', 'Perawatan Diri', 'Kebersihan'];
  
  const filteredProducts = activeCategory === 'Semua' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Sembako': return 'bg-cat-sembako';
      case 'Makanan': return 'bg-cat-makanan';
      case 'Minuman': return 'bg-cat-minuman';
      case 'Cemilan': return 'bg-cat-cemilan';
      case 'Perawatan Diri': return 'bg-cat-perawatan';
      case 'Kebersihan': return 'bg-cat-kebersihan';
      default: return 'bg-brand';
    }
  };

  const handleAdd = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Papan Promo Hero */}
      <div className="w-full relative overflow-hidden bg-brand-surface rounded-[24px] shadow-soft flex flex-col justify-center p-6 md:p-10 min-h-[160px] md:min-h-[220px] border border-brand-border">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-lg text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-ink font-bold mb-4 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Spesial Hari Ini</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-brand-ink mb-3 leading-tight">Belanja Harian<br/>Lebih Hemat</h2>
          <p className="text-brand-ink-muted text-sm md:text-base mb-4">Gunakan kode potongan belanja spesial.</p>
          <div className="inline-block bg-white border border-dashed border-brand-accent px-4 py-2 rounded-full font-bold text-brand-accent tracking-widest">
            SEHATI10
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-16 z-40 bg-brand-bg/95 backdrop-blur-md py-3 -mx-4 px-4 md:mx-0 md:px-0 border-b border-brand-border md:border-none">
        <div className="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar snap-x">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`snap-start whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-brand text-white shadow-soft' 
                    : 'bg-white text-brand-ink-muted border border-brand-border hover:border-brand hover:text-brand'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
        {filteredProducts.map((product) => (
          <Link href={`/produk/${product.id}`} key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-soft border border-transparent hover:border-brand-border hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
            
            {/* Color Strip for Category */}
            <div className={`absolute top-0 left-0 right-0 h-1 z-20 ${getCategoryColor(product.category)}`}></div>

            {/* Discount Badge Simulation */}
            {product.price > 20000 && (
              <div className="absolute top-3 left-3 z-10 bg-brand-accent text-brand-ink text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                PROMO
              </div>
            )}
            
            <div className="relative aspect-square bg-white p-4 pt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="p-4 flex flex-col flex-1 border-t border-brand-border/50">
              <div className="text-[11px] font-bold text-brand-ink-muted mb-1.5">{product.category}</div>
              <h4 className="text-sm font-medium text-brand-ink line-clamp-2 min-h-[40px] leading-snug group-hover:text-brand transition-colors">
                {product.name}
              </h4>
              <div className="mt-2 font-display font-medium text-lg text-brand-ink">
                Rp{product.price.toLocaleString('id-ID')}
              </div>
              
              <div className="mt-4">
                <button 
                  onClick={(e) => handleAdd(product.id, e)}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
                    addedItem === product.id 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-white border border-brand text-brand hover:bg-brand hover:text-white'
                  }`}
                >
                  {addedItem === product.id ? (
                    <><Check className="w-4 h-4" /> Masuk Keranjang</>
                  ) : (
                    <><Plus className="w-4 h-4 stroke-[3]" /> Tambah</>
                  )}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
