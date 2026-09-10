'use client';

import React, { useState } from 'react';
import { mockZones, mockOrders } from '@/lib/mock-data';
import { MapPin, Truck, Calendar, CheckCircle } from 'lucide-react';

export default function ZonasiPage() {
  const [manifestGenerated, setManifestGenerated] = useState(false);

  // Group pending orders by zone
  const pendingOrders = mockOrders.filter(o => o.status === 'Dikemas' || o.status === 'Diproses');
  
  const handleGenerate = () => {
    // Simulate loading
    setTimeout(() => {
      setManifestGenerated(true);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Zonasi & Rute</h1>
        <p className="mt-1 text-sm text-slate-500">Atur zona pengiriman dan buat manifest untuk hari ini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {mockZones.map((zone) => {
            const zoneOrdersCount = pendingOrders.filter(o => o.zoneId === zone.id).length;
            
            return (
              <div key={zone.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 mt-1">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{zone.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1 font-medium">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      {zone.schedule}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-center min-w-[130px]">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Pending</p>
                  <p className="text-xl font-extrabold text-slate-900">{zoneOrdersCount} <span className="text-sm font-medium text-slate-500">Item</span></p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h2 className="font-bold text-slate-900 text-lg mb-4">Aksi Harian</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Generate manifest untuk menugaskan driver pada pesanan yang sudah dikemas dan siap dikirim hari ini.
            </p>
            
            {!manifestGenerated ? (
              <button 
                onClick={handleGenerate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors shadow-sm shadow-blue-600/20"
              >
                <Truck className="h-5 w-5 mr-2" />
                Generate Manifest Hari Ini
              </button>
            ) : (
              <div className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 flex items-start shadow-sm">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm font-medium leading-relaxed">Manifest berhasil di-generate. 3 Driver telah ditugaskan.</p>
                </div>
                
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-sm text-slate-700">
                    Daftar Manifest Aktif
                  </div>
                  <ul className="divide-y divide-slate-100">
                    <li className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-slate-900">MNF-1001</p>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">Driver: Andi &bull; 5 Pesanan</p>
                        </div>
                        <span className="text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">Jalan</span>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-slate-900">MNF-1002</p>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">Driver: Budi &bull; 4 Pesanan</p>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full">Persiapan</span>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-slate-900">MNF-1003</p>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">Driver: Candra &bull; 6 Pesanan</p>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full">Persiapan</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
