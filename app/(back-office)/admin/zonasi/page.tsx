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
        <h1 className="text-2xl font-bold text-brand-ink">Manajemen Zonasi & Rute</h1>
        <p className="mt-1 text-sm text-brand-ink-muted">Atur zona pengiriman dan buat manifest untuk hari ini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {mockZones.map((zone) => {
            const zoneOrdersCount = pendingOrders.filter(o => o.zoneId === zone.id).length;
            
            return (
              <div key={zone.id} className="bg-brand-surface rounded-xl shadow-soft border border-brand-border p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand/80 rounded-xl border border-brand mt-1">
                    <MapPin className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-ink text-lg">{zone.name}</h3>
                    <div className="flex items-center text-sm text-brand-ink-muted mt-1 font-medium">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      {zone.schedule}
                    </div>
                  </div>
                </div>
                <div className="bg-brand-bg px-5 py-3 rounded-xl border border-brand-border text-center min-w-[130px]">
                  <p className="text-xs text-brand-ink-muted uppercase tracking-wider font-bold mb-1">Pending</p>
                  <p className="text-xl font-extrabold text-brand-ink">{zoneOrdersCount} <span className="text-sm font-medium text-brand-ink-muted">Item</span></p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-surface rounded-xl shadow-soft border border-brand-border p-6 sticky top-24">
            <h2 className="font-bold text-brand-ink text-lg mb-4">Aksi Harian</h2>
            <p className="text-sm text-brand-ink-muted mb-6 leading-relaxed">
              Generate manifest untuk menugaskan driver pada pesanan yang sudah dikemas dan siap dikirim hari ini.
            </p>
            
            {!manifestGenerated ? (
              <button 
                onClick={handleGenerate}
                className="w-full bg-brand hover:bg-brand text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors shadow-soft shadow-brand/20"
              >
                <Truck className="h-5 w-5 mr-2" />
                Generate Manifest Hari Ini
              </button>
            ) : (
              <div className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 flex items-start shadow-soft">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm font-medium leading-relaxed">Manifest berhasil di-generate. 3 Driver telah ditugaskan.</p>
                </div>
                
                <div className="border border-brand-border rounded-xl overflow-hidden bg-brand-surface shadow-soft">
                  <div className="bg-brand-bg px-4 py-3 border-b border-brand-border font-bold text-sm text-brand-ink-muted">
                    Daftar Manifest Aktif
                  </div>
                  <ul className="divide-y divide-brand-border">
                    <li className="p-4 hover:bg-brand-bg transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-brand-ink">MNF-1001</p>
                          <p className="text-xs text-brand-ink-muted mt-0.5 font-medium">Driver: Andi &bull; 5 Pesanan</p>
                        </div>
                        <span className="text-xs font-bold bg-brand text-brand border border-brand px-3 py-1 rounded-full">Jalan</span>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-brand-bg transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-brand-ink">MNF-1002</p>
                          <p className="text-xs text-brand-ink-muted mt-0.5 font-medium">Driver: Budi &bull; 4 Pesanan</p>
                        </div>
                        <span className="text-xs font-bold bg-brand-surface text-brand-ink-muted border border-brand-border px-3 py-1 rounded-full">Persiapan</span>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-brand-bg transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-brand-ink">MNF-1003</p>
                          <p className="text-xs text-brand-ink-muted mt-0.5 font-medium">Driver: Candra &bull; 6 Pesanan</p>
                        </div>
                        <span className="text-xs font-bold bg-brand-surface text-brand-ink-muted border border-brand-border px-3 py-1 rounded-full">Persiapan</span>
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

