'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockProducts } from '@/lib/mock-data';
import { Search, Plus, Minus, Package } from 'lucide-react';

export default function WarehousePage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStockChange = (id: string, change: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + change);
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-ink">Manajemen Warehouse</h1>
          <p className="mt-1 text-sm text-brand-ink-muted">Pantau dan kelola stok produk fisik yang tersedia di gudang.</p>
        </div>
      </div>

      <div className="bg-brand-surface rounded-xl shadow-soft border border-brand-border overflow-hidden">
        <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row justify-between gap-4 bg-brand-bg/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-ink-muted h-5 w-5" />
            <input 
              type="text" 
              placeholder="Cari nama atau kategori produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-shadow text-sm"
            />
          </div>
          <button className="bg-brand hover:bg-brand text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center shadow-soft shadow-brand/20">
            <Plus className="h-5 w-5 mr-2" />
            Tambah Produk Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-border">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Produk</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Stok</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Aksi Manual</th>
              </tr>
            </thead>
            <tbody className="bg-brand-surface divide-y divide-brand-border">
              {filteredProducts.map(product => {
                let statusLabel = "Aman";
                let statusColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
                
                if (product.stock === 0) {
                  statusLabel = "Habis";
                  statusColor = "bg-rose-100 text-rose-800 border-rose-200";
                } else if (product.stock < 30) {
                  statusLabel = "Menipis";
                  statusColor = "bg-amber-100 text-amber-800 border-amber-200";
                }

                return (
                  <tr key={product.id} className="hover:bg-brand-bg transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-brand-bg rounded-lg p-1 border border-brand-border/50 relative">
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill
                            sizes="40px"
                            className="object-cover rounded-md" 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-brand-ink">{product.name}</div>
                          <div className="text-xs text-brand-ink-muted font-medium mt-0.5">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-ink-muted font-medium">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <span className="text-sm font-extrabold text-brand-ink bg-brand-surface px-3 py-1 rounded-md border border-brand-border">
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => handleStockChange(product.id, -1)}
                          className="p-1.5 rounded-lg bg-brand-surface border border-brand-border hover:bg-brand-surface hover:border-brand-border text-brand-ink-muted transition-all shadow-soft active:scale-95"
                          title="Kurangi stok"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleStockChange(product.id, 1)}
                          className="p-1.5 rounded-lg bg-brand-surface border border-brand-border hover:bg-brand-surface hover:border-brand-border text-brand-ink-muted transition-all shadow-soft active:scale-95"
                          title="Tambah stok"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-brand-ink-muted flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-brand-ink-muted" />
              </div>
              <p className="text-lg font-medium text-brand-ink">Produk tidak ditemukan</p>
              <p className="text-sm mt-1">Coba gunakan kata kunci pencarian yang berbeda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

