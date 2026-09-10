"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Plus } from "lucide-react";
import { mockProducts, mockZones } from "@/lib/mock-data";

export default function CatalogPage() {
  const [selectedZone, setSelectedZone] = useState(mockZones[0].id);

  return (
    <div className="space-y-6">
      {/* Location Selector */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2 text-sm text-blue-900">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>Kirim ke:</span>
          <select 
            className="bg-transparent font-semibold border-none focus:ring-0 cursor-pointer"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            {mockZones.map(zone => (
              <option key={zone.id} value={zone.id}>{zone.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Banner Placeholder */}
      <div className="w-full h-32 md:h-48 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white p-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Promo Akhir Bulan!</h2>
          <p className="text-blue-100 text-sm md:text-base">Gunakan kode SEHATI10 untuk diskon 10%</p>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Kategori Pilihan</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {['Semua', 'Sembako', 'Makanan', 'Minuman', 'Cemilan', 'Perawatan Diri', 'Kebersihan'].map((cat, i) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Rekomendasi Untukmu</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <Link href={`/produk/${product.id}`}>
                <div className="aspect-square bg-gray-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                </div>
              </Link>
              <div className="p-3 flex flex-col flex-1">
                <Link href={`/produk/${product.id}`}>
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-tight">
                    {product.name}
                  </h4>
                </Link>
                <div className="mt-2 text-blue-600 font-bold text-sm">
                  Rp{product.price.toLocaleString('id-ID')}
                </div>
                <div className="mt-auto pt-3">
                  <button className="w-full flex items-center justify-center gap-1 bg-white border border-blue-600 text-blue-600 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                    <Plus className="w-4 h-4" />
                    Keranjang
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
