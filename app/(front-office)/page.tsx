"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MapPin, Plus, Check, Star, Timer, Flame, 
  Wallet, Ticket, ChevronRight, Apple, Beef, 
  Coffee, Cookie, Sparkles, Droplets, HeartPulse
} from "lucide-react";
import { mockProducts, mockZones } from "@/lib/mock-data";

export default function CatalogPage() {
  const [selectedZone, setSelectedZone] = useState(mockZones[0].id);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  
  // Timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Sembako', icon: Beef, color: 'bg-cat-sembako' },
    { name: 'Makanan', icon: Apple, color: 'bg-cat-makanan' },
    { name: 'Minuman', icon: Coffee, color: 'bg-cat-minuman' },
    { name: 'Cemilan', icon: Cookie, color: 'bg-cat-cemilan' },
    { name: 'Perawatan Diri', icon: Sparkles, color: 'bg-cat-perawatan' },
    { name: 'Kebersihan', icon: Droplets, color: 'bg-cat-kebersihan' },
    { name: 'Kesehatan', icon: HeartPulse, color: 'bg-cat-kesehatan' },
  ];
  
  const filteredProducts = activeCategory === 'Semua' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  const flashSaleProducts = mockProducts.slice(0, 4);

  const getCategoryColor = (cat: string) => {
    return categories.find(c => c.name === cat)?.color || 'bg-brand';
  };

  const handleAdd = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1000);
  };

  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-500 max-w-[480px] md:max-w-7xl mx-auto">
      
      {/* 1. Location & Wallet Bar (E-commerce Style) */}
      <div className="flex items-center justify-between gap-2 bg-white p-3 rounded-2xl shadow-soft border border-brand-border/50">
        <div className="flex items-center gap-2 flex-1">
          <div className="p-2 bg-brand/10 rounded-full text-brand shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] text-brand-ink-muted font-bold uppercase tracking-wide">Dikirim ke</span>
            <select 
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="text-sm font-bold text-brand-ink bg-transparent border-none p-0 focus:ring-0 truncate cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231e3a8a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right pr-5"
            >
              {mockZones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-px h-8 bg-brand-border"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-brand-ink-muted font-bold uppercase tracking-wide">Saldo</span>
            <span className="text-sm font-bold text-brand-ink">Rp150rb</span>
          </div>
          <div className="p-2 bg-brand-accent/20 text-brand-accent rounded-full shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 2. Promo Banner Carousel (E-commerce Style) */}
      <div className="w-full relative overflow-hidden bg-brand rounded-2xl shadow-soft flex flex-col justify-center p-6 md:p-10 min-h-[160px] md:min-h-[200px] text-brand-bg group cursor-pointer">
        {/* Abstract pattern */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        
        <div className="relative z-10 w-full max-w-lg text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent text-brand-ink font-bold mb-3 text-[10px] uppercase tracking-wider shadow-sm">
            <Ticket className="w-3.5 h-3.5" />
            <span>Promo Sehati</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-2 leading-tight text-white group-hover:scale-[1.02] transition-transform origin-left">
            Diskon 10%<br/>Untuk Semua Sembako
          </h2>
          <p className="text-white/80 text-xs md:text-sm">Gunakan kode: <strong className="bg-white/20 px-1.5 py-0.5 rounded">SEHATI10</strong></p>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-4 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
        </div>
      </div>

      {/* 3. Icon Grid Categories (Shopee/Tokopedia Style) */}
      <div className="bg-white p-4 rounded-2xl shadow-soft border border-brand-border/50">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-y-4 gap-x-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button 
                key={cat.name} 
                onClick={() => setActiveCategory(activeCategory === cat.name ? 'Semua' : cat.name)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-brand text-white shadow-soft ring-4 ring-brand/20' : 'bg-brand-surface text-brand-ink group-hover:bg-brand/10 group-hover:text-brand'
                }`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <span className={`text-[10px] md:text-xs font-bold text-center leading-tight px-1 ${isActive ? 'text-brand' : 'text-brand-ink-muted group-hover:text-brand-ink'}`}>
                  {cat.name}
                </span>
              </button>
            )
          })}
          
          <button onClick={() => setActiveCategory('Semua')} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-brand-surface text-brand-ink transition-all group-hover:bg-brand/10 group-hover:text-brand">
              <div className="grid grid-cols-2 gap-1 w-5 h-5">
                <div className="bg-current rounded-sm"></div><div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div><div className="bg-current rounded-sm"></div>
              </div>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-center leading-tight px-1 text-brand-ink-muted group-hover:text-brand-ink">
              Lihat Semua
            </span>
          </button>
        </div>
      </div>

      {/* 4. Flash Sale / Kejar Diskon */}
      {activeCategory === 'Semua' && (
        <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-4 shadow-soft text-white">
          <div className="flex items-end justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Flame className="w-6 h-6 text-brand-accent fill-brand-accent animate-pulse" />
                <h3 className="font-display font-bold text-xl italic tracking-tight">Kejar Diskon</h3>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-black/20 px-2 py-1 rounded-lg text-xs font-mono font-bold backdrop-blur-sm">
                <Timer className="w-3.5 h-3.5" />
                <span>{String(timeLeft.h).padStart(2, '0')}</span>:
                <span>{String(timeLeft.m).padStart(2, '0')}</span>:
                <span>{String(timeLeft.s).padStart(2, '0')}</span>
              </div>
            </div>
            <Link href="/" className="text-xs font-bold flex items-center hover:underline">
              Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x">
            {flashSaleProducts.map((product) => (
              <Link href={`/produk/${product.id}`} key={`flash-${product.id}`} className="snap-start min-w-[140px] w-[140px] md:min-w-[180px] bg-white rounded-xl overflow-hidden flex flex-col group cursor-pointer relative shadow-sm">
                <div className="absolute top-0 left-0 bg-brand-accent text-brand-ink text-[10px] font-bold px-2 py-0.5 rounded-br-lg z-10">
                  -50%
                </div>
                <div className="aspect-square bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 pt-1 flex flex-col flex-1 bg-white">
                  <div className="text-rose-600 font-display font-bold text-lg leading-none mb-1">
                    Rp{(product.price / 2).toLocaleString('id-ID')}
                  </div>
                  <div className="text-gray-400 text-[10px] line-through font-medium mb-2">
                    Rp{product.price.toLocaleString('id-ID')}
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-auto">
                    <div className="w-full bg-rose-100 rounded-full h-1.5 mb-1 overflow-hidden">
                      <div className="bg-rose-500 h-full w-[80%] rounded-full"></div>
                    </div>
                    <div className="text-[9px] font-bold text-rose-600 text-center uppercase tracking-wider">
                      Sisa 5
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. Main Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 mt-2">
          <h3 className="font-display font-bold text-xl text-brand-ink">Rekomendasi Untukmu</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <Link href={`/produk/${product.id}`} key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-transparent hover:border-brand-border hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
              
              <div className={`absolute top-0 left-0 right-0 h-1 z-20 ${getCategoryColor(product.category)}`}></div>

              <div className="relative aspect-square bg-white p-4 pt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                
                {/* Bebas Ongkir Badge */}
                <div className="absolute bottom-0 left-0 bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-tr-xl flex items-center gap-1 shadow-sm">
                  <Droplets className="w-3 h-3" />
                  Bebas Ongkir
                </div>
              </div>
              
              <div className="p-3.5 flex flex-col flex-1 border-t border-brand-border/30">
                <h4 className="text-xs md:text-sm font-medium text-brand-ink line-clamp-2 min-h-[36px] leading-snug group-hover:text-brand transition-colors mb-1.5">
                  {product.name}
                </h4>
                
                <div className="font-display font-bold text-base md:text-lg text-brand-ink mb-1.5">
                  Rp{product.price.toLocaleString('id-ID')}
                </div>

                <div className="flex items-center gap-1 text-[10px] text-brand-ink-muted mb-3">
                  <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
                  <span className="font-bold">4.9</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-brand-border mx-0.5"></span>
                  <span>Terjual 1rb+</span>
                </div>
                
                <div className="mt-auto">
                  <button 
                    onClick={(e) => handleAdd(product.id, e)}
                    className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                      addedItem === product.id 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-brand/5 border border-brand/20 text-brand hover:bg-brand hover:text-white'
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
    </div>
  );
}
