"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Plus, ChevronDown, Sparkles } from "lucide-react";
import { mockProducts, mockZones } from "@/lib/mock-data";

export default function CatalogPage() {
  const [selectedZone, setSelectedZone] = useState(mockZones[0].id);
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Sembako', 'Makanan', 'Minuman', 'Cemilan', 'Perawatan Diri', 'Kebersihan'];
  
  const filteredProducts = activeCategory === 'Semua' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Location Selector */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-1.5 inline-flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors max-w-full">
        <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-blue-50/50 text-blue-900">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-gray-500 hidden sm:inline">Kirim ke:</span>
          <select 
            className="bg-transparent font-bold border-none focus:ring-0 cursor-pointer p-0 pr-6 text-blue-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231e3a8a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right truncate max-w-[200px] md:max-w-xs"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            {mockZones.map(zone => (
              <option key={zone.id} value={zone.id}>{zone.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="w-full relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl shadow-lg shadow-blue-900/20 flex flex-col justify-center text-white p-6 md:p-10 min-h-[160px] md:min-h-[220px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3 border border-white/30">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>Spesial Hari Ini</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2 leading-tight tracking-tight">Belanja Harian<br/>Lebih Hemat!</h2>
          <p className="text-blue-100 text-sm md:text-base font-medium opacity-90">Gunakan kode <strong className="bg-white/20 px-2 py-0.5 rounded text-white tracking-wider">SEHATI10</strong> untuk diskon 10%</p>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-16 z-40 bg-gray-50/90 backdrop-blur-md py-2 -mx-4 px-4 md:mx-0 md:px-0">
        <h3 className="font-bold text-gray-900 mb-3 text-lg">Kategori Pilihan</h3>
        <div className="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar snap-x">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`snap-start whitespace-nowrap px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
                  isActive 
                    ? 'bg-blue-600 text-white border-transparent shadow-blue-600/30 ring-2 ring-blue-600/20 ring-offset-1 ring-offset-gray-50' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Rekomendasi Untukmu</h3>
          <span className="text-sm font-medium text-gray-500">{filteredProducts.length} Produk</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
              {/* Discount Badge Simulation */}
              {product.price > 20000 && (
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
                  PROMO
                </div>
              )}
              
              <Link href={`/produk/${product.id}`} className="block relative aspect-square bg-gray-50 p-4">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="object-contain w-full h-full mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform duration-500" />
              </Link>
              
              <div className="p-3.5 flex flex-col flex-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{product.category}</div>
                <Link href={`/produk/${product.id}`}>
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h4>
                </Link>
                <div className="mt-2 text-blue-600 font-black text-base">
                  Rp{product.price.toLocaleString('id-ID')}
                </div>
                
                <div className="mt-auto pt-4">
                  <button className="w-full flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-2 rounded-xl text-sm font-bold transition-colors active:scale-95">
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
