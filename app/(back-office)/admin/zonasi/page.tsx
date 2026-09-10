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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Zonasi & Rute</h1>
        <p className="mt-1 text-sm text-gray-500">Atur zona pengiriman dan buat manifest untuk hari ini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {mockZones.map((zone) => {
            const zoneOrdersCount = pendingOrders.filter(o => o.zoneId === zone.id).length;
            
            return (
              <div key={zone.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg mt-1">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{zone.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {zone.schedule}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-center min-w-[120px]">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Pending</p>
                  <p className="text-xl font-bold text-gray-900">{zoneOrdersCount} Pesanan</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Aksi Harian</h2>
            <p className="text-sm text-gray-600 mb-6">
              Generate manifest untuk menugaskan driver pada pesanan yang sudah dikemas dan siap dikirim hari ini.
            </p>
            
            {!manifestGenerated ? (
              <button 
                onClick={handleGenerate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <Truck className="h-5 w-5 mr-2" />
                Generate Manifest Hari Ini
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Manifest berhasil di-generate. 3 Driver telah ditugaskan.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium text-sm">
                    Daftar Manifest Aktif
                  </div>
                  <ul className="divide-y divide-gray-200">
                    <li className="p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">MNF-1001</p>
                          <p className="text-xs text-gray-500">Driver: Andi - 5 Pesanan</p>
                        </div>
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Jalan</span>
                      </div>
                    </li>
                    <li className="p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">MNF-1002</p>
                          <p className="text-xs text-gray-500">Driver: Budi - 4 Pesanan</p>
                        </div>
                        <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Persiapan</span>
                      </div>
                    </li>
                    <li className="p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">MNF-1003</p>
                          <p className="text-xs text-gray-500">Driver: Candra - 6 Pesanan</p>
                        </div>
                        <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Persiapan</span>
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
