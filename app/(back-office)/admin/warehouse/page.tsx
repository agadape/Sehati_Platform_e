'use client';

import React, { useState } from 'react';
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
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Warehouse</h1>
          <p className="mt-1 text-sm text-slate-500">Pantau dan kelola stok produk fisik yang tersedia di gudang.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Cari nama atau kategori produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center shadow-sm shadow-blue-600/20">
            <Plus className="h-5 w-5 mr-2" />
            Tambah Produk Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Produk</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi Manual</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
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
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-slate-900">{product.name}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
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
                          className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 hover:border-slate-400 text-slate-600 transition-all shadow-sm active:scale-95"
                          title="Kurangi stok"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleStockChange(product.id, 1)}
                          className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 hover:border-slate-400 text-slate-600 transition-all shadow-sm active:scale-95"
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
            <div className="p-12 text-center text-slate-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-lg font-medium text-slate-900">Produk tidak ditemukan</p>
              <p className="text-sm mt-1">Coba gunakan kata kunci pencarian yang berbeda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
